export enum ValidFileType {
    PNG = 'png',
    JPEG = 'jpeg',
}

export enum InvalidFileType {
    JSON = 'json',
    MP3 = 'mp3',
    MP4 = 'mp4',
}

export type FileType = ValidFileType | InvalidFileType;

export interface GeneratedFile {
    name: string;
    mimeType: string;
    buffer: Buffer;
    sizeInMB: number;
    sizeInBytes: number;
}

export class FileGenerator {

    private static readonly mimeTypeMap: Record<FileType, string> = {
        [ValidFileType.PNG]: 'image/png',
        [ValidFileType.JPEG]: 'image/jpeg',
        [InvalidFileType.JSON]: 'application/json',
        [InvalidFileType.MP3]: 'audio/mpeg',
        [InvalidFileType.MP4]: 'video/mp4',
    };

    /**
     * Generates a file entirely in memory — no disk read/write.
     * @param fileName base name without extension, e.g. 'validImage'
     * @param fileType ValidFileType or InvalidFileType, e.g. ValidFileType.PNG
     * @param sizeInMB desired file size in MB
     */
    static generateInMemoryFile(fileName: string, fileType: FileType, sizeInMB: number): GeneratedFile {
        const sizeInBytes = Math.round(sizeInMB * 1024 * 1024);
        const buffer = Buffer.alloc(sizeInBytes, 0);
        const name = `${fileName}.${fileType}`;

        return {
            name,
            mimeType: this.mimeTypeMap[fileType],
            buffer,
            sizeInMB,
            sizeInBytes,
        };
    }
}

export class FileFormatter {

    static getSizeInMB(bytes: number, decimals: number = 2): string {
        return `${(bytes / (1024 * 1024)).toFixed(decimals)} MB`;
    }

    static getSizeInKB(bytes: number, decimals: number = 2): string {
        return `${(bytes / 1024).toFixed(decimals)} KB`;
    }
}