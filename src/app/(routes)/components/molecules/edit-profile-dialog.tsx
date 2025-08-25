"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";
import { Pencil } from "lucide-react";

type Props = {
  full_name: string;
  username?: string;
  country?: string;
  city?: string;
  professional_title?: string;
  bio?: string;
  photo_profile?: string;
  profileId: string;
  onSaved?: () => void;
};

export function EditProfileDialog({
  full_name,
  username,
  country,
  city,
  professional_title,
  bio,
  photo_profile,
  onSaved,
  profileId,
}: Props) {
  const supabase = createClient();
  const [fullName, setFullName] = useState(full_name || "");
  const [userName, setUserName] = useState(username || "");
  const [userCountry, setUserCountry] = useState(country || "");
  const [userCity, setUserCity] = useState(city || "");
  const [userProfessionalTitle, setUserProfessionalTitle] = useState(
    professional_title || ""
  );
  const [userBio, setUserBio] = useState(bio || "");
  const [userPhoto, setUserPhoto] = useState(photo_profile || "");
  const [open, setOpen] = useState(false);


  const handlePhotoUpload = async (file: File) => {
  if (!file) return;

  const filePath = `profile-photos/${profileId}-${Date.now()}`;
  const { error: uploadError } = await supabase.storage
    .from("profile-photos")
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    console.error("Upload failed:", uploadError.message);
    return;
  }

  const { data: publicUrlData } = supabase.storage
    .from("profile-photos")
    .getPublicUrl(filePath);

  if (!publicUrlData || !publicUrlData.publicUrl) {
    console.error("Failed to get public URL");
    return;
  }

  setUserPhoto(publicUrlData.publicUrl);
};


  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("profile")
        .update({
          full_name: fullName,
          username: userName,
          country: userCountry,
          city: userCity,
          professional_title: userProfessionalTitle,
          bio: userBio,
          photo_profile: userPhoto,
        })
        .eq("id", profileId);

      if (error) {
        console.error("Failed to update profile:", error.message);
      } else {
        onSaved && onSaved();
        setOpen(false);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil className="cursor-pointer" size={16} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Foto Profil */}
          <div className="flex flex-col gap-2">
            <Label>Profile Photo</Label>
            {userPhoto && (
              <img
                src={userPhoto}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
            )}
            <Input
              type="file"
              accept="image/*"
              className="text-xs shadow-none border-gray-100"
              onChange={(e) => {
                if (e.target.files) handlePhotoUpload(e.target.files[0]);
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Full Name</Label>
            <Input className="text-xs shadow-none border-gray-100" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Username</Label>
            <Input className="text-xs shadow-none border-gray-100" value={userName} onChange={(e) => setUserName(e.target.value)} />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="">Country</Label>
            <Input className="text-xs shadow-none border-gray-100" value={userCountry} onChange={(e) => setUserCountry(e.target.value)} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>City</Label>
            <Input className="text-xs shadow-none border-gray-100" value={userCity} onChange={(e) => setUserCity(e.target.value)} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Professional Title</Label>
            <Input
              value={userProfessionalTitle}
              onChange={(e) => setUserProfessionalTitle(e.target.value)} className="text-xs shadow-none border-gray-100"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Bio</Label>
            <Textarea value={userBio} onChange={(e) => setUserBio(e.target.value)} />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            onClick={handleSave}
            className="bg-pink-500 text-white hover:bg-pink-600"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
