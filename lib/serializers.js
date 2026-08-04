export function serializePainting(p) {
  if (!p) return p;

  return {
    ...p,
    price: p.price !== null && p.price !== undefined ? Number(p.price) : null,
    originalPrice: p.originalPrice !== null && p.originalPrice !== undefined ? Number(p.originalPrice) : null,
    width: p.width !== null && p.width !== undefined ? Number(p.width) : null,
    height: p.height !== null && p.height !== undefined ? Number(p.height) : null,
  };
}
