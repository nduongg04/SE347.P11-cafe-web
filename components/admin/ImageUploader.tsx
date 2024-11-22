"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ImageUploader({
  image,
  onImageUpload,
  isLoading,
}: {
  required?: boolean;
  image: string | File | null;
  onImageUpload: (file: File) => void;
  isLoading?: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof image === "string") {
      setPreview(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={cn(
        "relative flex h-32 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
        isLoading && "pointer-events-none opacity-50",
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
    >
      {preview ? (
        <Image
          src={preview}
          alt="Selected image"
          layout="fill"
          objectFit="contain"
        />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Upload className="mb-2 h-8 w-8 text-gray-500" />
          <p className="text-sm text-gray-500">Click or drag image</p>
        </div>
      )}
      <Input
        disabled={isLoading}
        id="dropzone-file"
        type="file"
        className="hidden"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}
