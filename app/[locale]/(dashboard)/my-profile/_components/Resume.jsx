"use client";
import React, { useState, useRef } from "react";
import Upload from "@/assets/icons/upload.svg";
import Close from "@/assets/icons/close.svg";
import Tick from "@/assets/icons/tick.svg";
import LanguageLevelSelect from "./LanguageLevelSelect";
import WorkingHistory from "./WorkingHistory";
import EducationHistory from "./EducationHistory";
import Skills from "./Skills";
import ResumeTab from "./ResumeTab";
import { useTranslation } from "../../../TranslationContext";
import ResidencyState from "./ConsultationRate";
import RecommendedSalary from "./RecommendedSalary";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import Play from "@/assets/icons/Play.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Spinner from "@/components/Spinner";
const Resume = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [videoModal, setVideoModal] = useState(false);
  const dic = useTranslation();
  const r = dic.consultor.edit;
  const { handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const tabs = [
    { id: 0, label: r.intro_video },
    { id: 1, label: r.language_level },
    { id: 2, label: r.residency_state },
    { id: 7, label: r.recommended_salary },
    { id: 3, label: r.work_experience },
    { id: 4, label: r.education_history },
    { id: 5, label: r.skills },
    { id: 6, label: r.resume },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ["introduction-video"],
    queryFn: async () =>
      await request({
        url: "/profile/video",
        method: "get",
      }),
  });

  const videoMutation = useMutation({
    mutationFn: async (data) =>
      await request({
        url: "/profile/video",
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data,
      }),
    onSuccess: () => {
      toast.success("Your Video has been successfully uploaded");
      queryClient.invalidateQueries(["introduction-video"]);
    },
    onError: (err) => {
      toast.error(`Your Video has failed to upload ${err?.message}`);
    },
  });

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);

      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }

      console.log("Selected file:", file);
    }
  };

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);

      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }

      console.log("Dropped file:", file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      intro_video: selectedFile,
    };
    videoMutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="lg:px-6 lg:py-8 p-4 flex flex-col gap-6 w-full h-full">
      <div className="flex flex-wrap gap-2 rtl:flex-row-reverse">
        {tabs.map(({ id, label }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => handleTabClick(id)}
              className={`w-42 py-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                isActive
                  ? "bg-Primary-400 text-white border-Primary-500 shadow-md"
                  : "bg-transparent text-Text-Secondary border-default-divider hover:bg-Gray-100 hover:border-Gray-300"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 w-full rtl:items-end h-full">
        {activeTab === 0 && (
          <>
            {data?.data?.has_video === true ? (
              <>
                {" "}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*,video/*"
                    className="hidden"
                  />

                  <div
                    className="border w-full max-w-lg bg-alphaw-100 border-dashed rounded-lg border-default-divider flex flex-col items-center justify-center py-4 gap-4 cursor-pointer hover:border-Primary-300 transition-colors duration-200"
                    onClick={handleDivClick}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    style={{ minHeight: "200px" }}
                  >
                    <button className="p-4 bg-Gray-100 rounded-full hover:bg-Gray-200 transition-colors duration-200">
                      <Upload />
                    </button>
                    <div className="flex flex-col gap-2 text-center">
                      <div className="flex items-center gap-2 rtl:flex-row-reverse">
                        <span className="text-Primary-500 cursor-pointer hover:text-Primary-600">
                          {r.click}
                        </span>
                        <span className="text-Text-Secondary">{r.or_drop}</span>
                      </div>
                      <span className="text-Gray-400">
                        SVG, PNG, JPG or GIF (max. 800x400px)
                      </span>
                    </div>
                  </div>

                  {previewUrl && (
                    <div className="flex flex-col gap-3 w-full max-w-lg rtl:items-end">
                      <div className="flex items-center justify-between w-full">
                        <h3 className="text-Gray-600 font-medium">
                          {r.preview}
                        </h3>
                        <button
                          onClick={removeFile}
                          className="text-error-main hover:text-error-dark flex items-center gap-2 transition-colors duration-200"
                        >
                          <Close className="w-4 h-4 fill-error-main" />
                          {r.delete_pic}
                        </button>
                      </div>

                      <div className="border border-default-divider rounded-lg p-3 bg-alphaw-100 w-full">
                        <div className="flex flex-col items-center gap-3">
                          <img
                            src={previewUrl}
                            alt="پیش‌نمایش تصویر آپلود شده"
                            className="max-w-full max-h-64 object-contain rounded-md"
                            onLoad={() => URL.revokeObjectURL(previewUrl)}
                          />
                          <div className="text-center">
                            <p className="text-Text-Secondary text-sm">
                              {selectedFile.name}
                            </p>
                            <p className="text-Gray-400 text-xs">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedFile &&
                    selectedFile.type.startsWith("video/") &&
                    !previewUrl && (
                      <div className="flex flex-col gap-3 w-full max-w-lg rtl:items-end">
                        <div className="flex items-center justify-between w-full">
                          <h3 className="text-Gray-600 font-medium">
                            فایل ویدیویی:
                          </h3>
                          <button
                            onClick={removeFile}
                            className="text-error-main hover:text-error-dark flex items-center gap-2 transition-colors duration-200"
                          >
                            <Close className="w-4 h-4 fill-error-main" />
                            حذف فایل
                          </button>
                        </div>

                        <div className="border border-default-divider rounded-lg p-4 bg-alphaw-100 w-full">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-Primary-100 rounded-full">
                              <Upload className="w-6 h-6 fill-Primary-500" />
                            </div>
                            <div className="flex flex-col">
                              <p className="text-Text-Secondary text-sm font-medium">
                                {selectedFile.name}
                              </p>
                              <p className="text-Gray-400 text-xs">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)}{" "}
                                MB
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  <div className="flex flex-row ltr:justify-end rtl:flex-row-reverse  items-center w-full  gap-6 mt-auto ">
                    <button
                      type="button"
                      className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
                    >
                      {r.cancel}
                    </button>
                    <button
                      type="submit"
                      className="flex cursor-pointer w-full rtl:flex-row-reverse items-center justify-center text-white bg-Primary-400 py-2 lg:w-42  rounded-lg"
                    >
                      {/* <span>{mutation.isLoading ? "در حال ارسال..." : "بعدی"}</span> */}
                      <span> {r.save_information}</span>
                      <Tick className="fill-white " />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <Dialog open={videoModal} onOpenChange={setVideoModal}>
                  <DialogTrigger>
                    <button
                      onClick={() => setVideoModal((prev) => !prev)}
                      className="bg-Gray-100 p-8 rounded-2xl border border-default-divider cursor-pointer"
                    >
                      <Play className="fill-Gray-900" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl h-fit">
                    {" "}
                    {/* Added className for better sizing */}
                    <DialogHeader>
                      <DialogTitle>Watch Your Video Here</DialogTitle>
                      <DialogDescription className="w-full">
                        <video
                          src={data?.data?.video}
                          controls
                          autoPlay
                          className="w-full max-h-[100vh] object-contain rounded-lg"
                        >
                          Your browser does not support the video tag.
                        </video>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </>
        )}
        {activeTab === 1 && <LanguageLevelSelect />}
        {activeTab === 2 && <ResidencyState />}
        {activeTab === 3 && <WorkingHistory />}
        {activeTab === 4 && <EducationHistory />}
        {activeTab === 5 && <Skills />}
        {activeTab === 6 && <ResumeTab />}
        {activeTab === 7 && <RecommendedSalary />}
      </div>
    </div>
  );
};

export default Resume;
