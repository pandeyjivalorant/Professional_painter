'use server';

import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Utility to check auth
async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthorized');
  return session;
}

// Validation schema
const paintingSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  story: z.string().optional(),
  price: z.coerce.number().optional().nullable(),
  originalPrice: z.coerce.number().optional().nullable(),
  currency: z.string().default('USD'),
  year: z.coerce.number().optional().nullable(),
  status: z.enum(['AVAILABLE', 'RESERVED', 'SOLD', 'NOT_FOR_SALE']).default('AVAILABLE'),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  displayOrder: z.coerce.number().default(0),
  style: z.string().optional().nullable(),
  medium: z.string().optional().nullable(),
  materials: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  width: z.coerce.number().optional().nullable(),
  height: z.coerce.number().optional().nullable(),
  unit: z.string().default('inches'),
  isFramed: z.boolean().default(false),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  images: z.array(z.object({
    url: z.string(),
    cloudinaryPublicId: z.string().optional().nullable(),
    isMain: z.boolean().default(false),
    displayOrder: z.coerce.number().default(0),
    width: z.coerce.number().optional().nullable(),
    height: z.coerce.number().optional().nullable(),
    format: z.string().optional().nullable(),
    sizeBytes: z.coerce.number().optional().nullable(),
  })).default([]),
});

export async function createPainting(formData) {
  try {
    await checkAuth();
    
    // Parse JSON string to object
    const data = JSON.parse(formData);
    const parsed = paintingSchema.safeParse(data);
    
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0].message };
    }

    const val = parsed.data;

    // Check slug
    const existing = await prisma.painting.findUnique({ where: { slug: val.slug } });
    if (existing) {
      return { success: false, error: 'Slug must be unique' };
    }

    const { images, ...paintingData } = val;

    await prisma.painting.create({
      data: {
        ...paintingData,
        images: {
          create: images.map(img => ({
            url: img.url,
            cloudinaryPublicId: img.cloudinaryPublicId,
            isMain: img.isMain,
            displayOrder: img.displayOrder,
            width: img.width,
            height: img.height,
            format: img.format,
            sizeBytes: img.sizeBytes,
          }))
        }
      }
    });

    revalidatePath('/gallery');
    revalidatePath('/admin/paintings');
    return { success: true };
  } catch (error) {
    console.error('Create painting error:', error);
    return { success: false, error: error.message };
  }
}

export async function updatePainting(id, formData) {
  try {
    await checkAuth();
    
    const data = JSON.parse(formData);
    const parsed = paintingSchema.safeParse(data);
    
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0].message };
    }

    const val = parsed.data;

    // Check slug
    const existing = await prisma.painting.findUnique({ where: { slug: val.slug } });
    if (existing && existing.id !== id) {
      return { success: false, error: 'Slug must be unique' };
    }

    const { images, ...paintingData } = val;

    await prisma.$transaction(async (tx) => {
      await tx.painting.update({
        where: { id },
        data: paintingData
      });

      // Clear existing images
      await tx.paintingImage.deleteMany({
        where: { paintingId: id }
      });

      // Insert new
      if (images && images.length > 0) {
        await tx.paintingImage.createMany({
          data: images.map(img => ({
            paintingId: id,
            url: img.url,
            cloudinaryPublicId: img.cloudinaryPublicId,
            isMain: img.isMain,
            displayOrder: img.displayOrder,
            width: img.width,
            height: img.height,
            format: img.format,
            sizeBytes: img.sizeBytes,
          }))
        });
      }
    });

    revalidatePath('/gallery');
    revalidatePath(`/gallery/${val.slug}`);
    revalidatePath('/admin/paintings');
    return { success: true };
  } catch (error) {
    console.error('Update painting error:', error);
    return { success: false, error: error.message };
  }
}

export async function deletePainting(id) {
  try {
    await checkAuth();
    await prisma.painting.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
    
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Also need a server action to delete Cloudinary image securely using Admin SDK
// This will be called from the client when an image is removed from the list.
import cloudinary from '@/lib/cloudinary';

export async function deleteCloudinaryImage(publicId) {
  try {
    await checkAuth();
    if (!publicId) return { success: false, error: 'No public ID provided' };
    
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('Cloudinary destroy result:', result);
    
    return { success: true };
  } catch (error) {
    console.error('Delete cloudinary error:', error);
    return { success: false, error: error.message };
  }
}

export async function createCertificate(formData) {
  try {
    await checkAuth();

    const data = JSON.parse(formData);

    const certSchema = z.object({
      title: z.string().min(1, 'Title is required'),
      description: z.string().optional().nullable(),
      imageUrl: z.string().min(1, 'Image is required'),
      cloudinaryPublicId: z.string().optional().nullable(),
      issuedBy: z.string().optional().nullable(),
      issueDate: z.string().optional().nullable(),
      displayOrder: z.coerce.number().default(0),
    });

    const parsed = certSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0].message };
    }

    const val = parsed.data;

    await prisma.certificate.create({
      data: {
        title: val.title,
        description: val.description || null,
        imageUrl: val.imageUrl,
        cloudinaryPublicId: val.cloudinaryPublicId || null,
        issuedBy: val.issuedBy || null,
        issueDate: val.issueDate ? new Date(val.issueDate) : null,
        displayOrder: val.displayOrder,
      },
    });

    revalidatePath('/certificates');
    revalidatePath('/admin/certificates');
    return { success: true };
  } catch (error) {
    console.error('Create certificate error:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteCertificate(id) {
  try {
    await checkAuth();
    await prisma.certificate.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
    
    revalidatePath('/certificates');
    revalidatePath('/admin/certificates');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function markMessageRead(id, isRead) {
  try {
    await checkAuth();
    await prisma.contactMessage.update({
      where: { id },
      data: { isRead }
    });
    
    revalidatePath('/admin/messages');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteMessage(id) {
  try {
    await checkAuth();
    await prisma.contactMessage.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
    
    revalidatePath('/admin/messages');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
