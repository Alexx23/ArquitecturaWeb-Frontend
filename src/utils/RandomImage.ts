function getImageUrl(id: number): string {
  return `https://picsum.photos/id/1${id}/400/800`;
}

function getAvatarUrl(id: number): string {
  return `https://api.multiavatar.com/${id}.svg`;
}

export { getImageUrl, getAvatarUrl };
