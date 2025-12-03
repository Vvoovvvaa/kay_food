import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PhotoValidationPipe implements PipeTransform {
  transform(files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    const MAX_SIZE = 5 * 1024 * 1024;
    const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

    for (const file of files) {
      if (file.size > MAX_SIZE) {
        throw new BadRequestException(
          `File ${file.originalname} exceeds allowed size 5MB`
        );
      }

      if (!ALLOWED_TYPES.includes(file.mimetype)) {
        throw new BadRequestException(
          `File ${file.originalname} has an invalid format`
        );
      }
    }

    return files;
  }
}