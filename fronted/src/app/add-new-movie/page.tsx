"use client";

import BottomWave from "@/components/global/BottomWave";
import Button from "@/components/global/Button";
import Heading from "@/components/global/Heading";
import InputField from "@/components/global/InputField";
import AddMovieIcon from "@/components/svgIcons/AddMovieIcon";
import UploadIcon from "@/components/svgIcons/UploadIcon";
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    publishYear: "",
    file: null as File | null,
  });
  const [fileName, setFileName] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter()

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFormData((prevData) => ({ ...prevData, file: selectedFile }));
      setFileName(selectedFile.name);
      setPreview(URL.createObjectURL(selectedFile)); // Generate preview URL
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, publishYear, file } = formData;

    if (!name || !publishYear || !file) {
      setErrorMessage("Please fill all fields and upload an image.");
      return;
    }

    const data = new FormData();
    data.append("title", name);
    data.append("publish_year", publishYear);
    data.append("image", file);

    console.log(data, "dataValue")

    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch("http://192.167.1.94:8000/api/v1/authentication/movies/", {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response, "checkStatusData")

      if (response.status === 201) {
        console.log("movieesss");
        router.push('/movie-list')
      }

      console.log("Movie data submitted successfully", response);
      setErrorMessage(null); // Clear any previous errors
    } catch (error) {
      setErrorMessage((error as Error).message);
      console.error("Error submitting movie data:", error);
    }
  };

  return (
    <div>
      <div className="container mx-auto max-w-[1440px] lg:max-w-[900px] xl:max-w-[1200px] md:max-w-[700px] px-4 md:my-24 my-10">
        <div>
          <Heading>Create a new movie</Heading>
        </div>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 grid-cols-1 gap-4 md:mt-28 mt-10">
          <div className="min-h-[500px]">
            <div
              className={`md:w-4/5 w-full border-dashed border-2 border-white-400 rounded-lg h-full flex items-center justify-center bg-[var(--color-input-bg)] bg-cover bg-center`}
              style={{
                backgroundImage: preview ? `url(${preview})` : "none",
              }}
            >
              <input
                id="file-upload"
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
                {!preview && (
                  <>
                    {/* <FaUpload className="text-white mb-2" size={20} /> */}
                    <UploadIcon />
                    <span className="text-white mt-2">Drop an image here</span>
                  </>
                )}
                {fileName && <p className="mt-2 text-white">{fileName}</p>}
              </label>
            </div>
          </div>
          <div className="flex items-left flex-col md:w-4/6 w-full">
            <InputField
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter movie name"
              onChange={handleChange}
            />
            <div className="md:mt-8 mt-4">
              <InputField
                type="text"
                name="publishYear"
                value={formData.publishYear}
                placeholder="Enter publishing year"
                onChange={handleChange}
              />
            </div>
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
            <div className="flex md:mt-10 gap-8">
              <a href="/add-new-movie" className="mt-12">
                <Button backgroundColor="transparent" borderColor="#ffffff">
                  Cancel
                </Button>
              </a>
              <div className="mt-12">
                <Button type="submit" backgroundColor="var(--color-primary)">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <BottomWave />
    </div>
  );
}
