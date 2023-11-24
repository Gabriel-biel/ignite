export function transformUploadFileName(fileName: string) {
  fileName = fileName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

  fileName = fileName.replace(/^\w\s-/g, '').replace(/[_\s]+/g, '-')

  return fileName
}
