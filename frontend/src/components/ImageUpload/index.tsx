import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import { UploadSimple, Camera, X, FileImage } from 'phosphor-react';
import './styles.css';

interface ImageUploadProps {
    onFileSelect?: (file: File) => void;
}

const ImageUpload = ({ onFileSelect }: ImageUploadProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);

    // File validation
    const validateFile = (file: File): string | null => {
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        const maxSize = 50 * 1024 * 1024; // 50MB

        if (!validTypes.includes(file.type)) {
            return 'Invalid file type. Please upload JPEG, PNG, or PDF files only.';
        }

        if (file.size > maxSize) {
            return 'File size exceeds 50MB. Please choose a smaller file.';
        }

        return null;
    };

    // Handle file selection
    const handleFiles = (files: FileList | null) => {
        if (!files || files.length === 0) return;

        const file = files[0];
        const validationError = validateFile(file);

        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);
        setSelectedFile(file);

        // Create preview for images
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
        }

        // Mark as complete immediately
        setUploadProgress(100);
        setIsUploading(false);
        
        // Notify parent component
        if (onFileSelect) onFileSelect(file);
    };

    // Drag and drop handlers
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    // File input change handler
    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
    };

    // Remove selected file
    const handleRemoveFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setUploadProgress(0);
        setIsUploading(false);
        setError(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (cameraInputRef.current) cameraInputRef.current.value = '';
    };

    // Format file size
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i)) + ' ' + sizes[i];
    };

    return (
        <div className="image-upload">
            {!selectedFile ? (
                <>
                    {/* Drag & Drop Zone */}
                    <div
                        className={`upload-zone ${isDragging ? 'dragging' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        role="button"
                        tabIndex={0}
                        aria-label="Upload file area"
                    >
                        <UploadSimple size={48} weight="duotone" className="upload-icon" />
                        <h3 className="upload-title">Choose a file or drag & drop it here</h3>
                        <p className="upload-subtitle">JPEG, PNG, or PDF formats, up to 50MB</p>

                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current?.click();
                            }}
                        >
                            Browse File
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="upload-actions">
                        <button
                            type="button"
                            className="btn btn-camera"
                            onClick={() => cameraInputRef.current?.click()}
                        >
                            <Camera size={20} weight="bold" />
                            Take Photo
                        </button>
                    </div>

                    {/* Hidden File Inputs */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,application/pdf"
                        onChange={handleFileInputChange}
                        style={{ display: 'none' }}
                        aria-label="File input"
                    />
                    <input
                        ref={cameraInputRef}
                        type="file"
                        accept="image/*"
                        capture={true as any}
                        onChange={handleFileInputChange}
                        style={{ display: 'none' }}
                        aria-label="Camera input"
                    />

                    {/* Error Message */}
                    {error && (
                        <div className="upload-error" role="alert">
                            {error}
                        </div>
                    )}
                </>
            ) : (
                <>
                    {/* File Preview */}
                    <div className="file-preview">
                        <div className="file-preview-content">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="preview-image" />
                            ) : (
                                <div className="file-icon-wrapper">
                                    <FileImage size={48} weight="duotone" />
                                </div>
                            )}

                            <div className="file-info">
                                <div className="file-header">
                                    <div>
                                        <h4 className="file-name">{selectedFile.name}</h4>
                                        <p className="file-size">
                                            {formatFileSize(selectedFile.size)}
                                            {uploadProgress === 100 && ` • Ready`}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn-remove"
                                        onClick={handleRemoveFile}
                                        aria-label="Remove file"
                                    >
                                        <X size={20} weight="bold" />
                                    </button>
                                </div>

                                {/* Upload Progress Bar */}
                                {uploadProgress > 0 && (
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${uploadProgress}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ImageUpload;
