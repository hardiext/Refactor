"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Experience } from "@/types/experience";
import { createClient } from "@/utils/supabase/client";
import { EditIcon, Plus, X } from "lucide-react";

type Props = {
  experience?: Experience;
  profileId: string;
  onSaved: () => void;
};

export function ExperienceFormDialog({
  experience,
  profileId,
  onSaved,
}: Props) {
  const supabase = createClient();
  const [open, setOpen] = useState(false);

  const [company, setCompany] = useState(experience?.company || "");
  const [role, setRole] = useState(experience?.role || "");
  const [period, setPeriod] = useState(experience?.period || "");
  const [startDate, setStartDate] = useState(experience?.start_date || "");
  const [endDate, setEndDate] = useState(experience?.end_date || "");
  const [location, setLocation] = useState(experience?.location || "");
  const [description, setDescription] = useState(experience?.description || "");
  const [logoUrl, setLogoUrl] = useState(experience?.logoUrl || "");
  const [skills, setSkills] = useState<string[]>(experience?.skills || []);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const data = {
      profile_id: profileId,
      company,
      role,
      period,
      start_date: startDate || null,
      end_date: endDate || null,
      location,
      skills,
      description,
      logo_url: logoUrl,
    };

    if (experience?.id) {
      const { error } = await supabase
        .from("work_experience")
        .update(data)
        .eq("id", experience.id);
      if (error) console.error(error);
    } else {
      const { error } = await supabase.from("work_experience").insert([data]);
      if (error) console.error(error);
    }

    onSaved();
    setOpen(false);
  };

  const handleDelete = async () => {
    if (!experience?.id) return;
    const confirmed = confirm(
      "Are you sure you want to delete this experience?"
    );
    if (!confirmed) return;

    const { error } = await supabase
      .from("work_experience")
      .delete()
      .eq("id", experience.id);
    if (!error) {
      onSaved();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
  
        onClick={() => setOpen(true)}
        className="ml-2 hover:shadow-none border-0 shadow-none bg-white hover:bg-white text-black transition"
      >
        {experience ? <EditIcon className="w-4 h-4" /> : <Plus />}
      </Button>

      <DialogContent className="sm:max-w-lg p-0 rounded-lg">
        <Card className="overflow-hidden rounded-lg py-0 gap-0  pt-4">
          <div className="max-h-[80vh] overflow-y-auto">
            <CardHeader className="">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                  {experience ? "Edit" : "Add"} Experience
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  Isi detail pengalaman kerja
                </DialogDescription>
              </DialogHeader>
            </CardHeader>

            <CardContent className="grid gap-4 py-4 px-6  ">
              <div>
                <label
                  className="text-sm font-normal mb-2 block"
                  htmlFor="company"
                >
                  Company
                </label>
                <Input
                 tabIndex={-1 }
                  id="company"
                  placeholder="Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="border-gray-100 shadow-none rounded-sm"
                />
              </div>
              <div>
                <label
                  className="text-sm font-normal mb-2 block"
                  htmlFor="role"
                >
                  Role
                </label>
                <Input
                  tabIndex={-1}
                  id="role"
                  placeholder="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="border-gray-100 shadow-none rounded-sm"
                />
              </div>
              <div>
                <label
                  className="text-sm font-normal mb-2 block"
                  htmlFor="period"
                >
                  Period
                </label>
                <Input
                  tabIndex={-1}
                  id="period"
                  placeholder="Period"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="border-gray-100 shadow-none rounded-sm"
                />
              </div>
              <div>
                <label
                  className="text-sm font-normal mb-2 block"
                  htmlFor="start-date"
                >
                  Start Date
                </label>
                <Input
                  tabIndex={-1}
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border-gray-100 shadow-none rounded-sm"
                />
              </div>
              <div>
                <label
                  className="text-sm font-normal mb-2 block"
                  htmlFor="end-date"
                >
                  End Date
                </label>
                <Input
                  tabIndex={-1}
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border-gray-100 shadow-none rounded-sm"
                />
              </div>
              <div>
                <label
                  className="text-sm font-normal mb-2 block"
                  htmlFor="location"
                >
                  Location
                </label>
                <Input
                  tabIndex={-1}
                  id="location"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border-gray-100 shadow-none rounded-sm"
                />
              </div>
              <div>
                <div>
                  <label
                    className="text-sm font-normal mb-2 block"
                    htmlFor="logo-url"
                  >
                    Logo URL
                  </label>
                  <Input
                    tabIndex={-1}
                    id="logo-url"
                    placeholder="Logo URL"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="border-gray-100 shadow-none rounded-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  className="text-sm font-normal mb-2 block"
                  htmlFor="description"
                >
                  Description
                </label>
                <Input
                  tabIndex={-1}
                  id="description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border-gray-100 shadow-none rounded-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="logoUrl"
                  className="text-sm font-normal mb-2 block "
                >
                  Logo Url
                </label>
                <Input
                  tabIndex={-1}
                  id="logoUrl"
                  placeholder="Logo URL"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="border-gray-100 shadow-none rounded-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-normal mv-2">Skills</label>
                <div className="flex gap-2">
                  <Input
                    id="new-skill"
                     tabIndex={-1}
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="border-gray-100 shadow-none rounded-sm"
                  />
                  <Button onClick={handleAddSkill}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {skills.map((skill, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="flex items-center gap-1 relative"
                    >
                      <span className="inline-block">{skill}</span>
                      <div>
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => handleRemoveSkill(idx)}
                        />
                        </div>
                    </Badge>
                  ))}
                </div>
                <div className="text-center pt-2">
                  <button onClick={handleDelete} className="text-sm font-medium text-neutral-800 cursor-pointer">Delete Experience</button>
                </div>
              </div>
            </CardContent>
          </div>

          <DialogFooter className="flex justify-end gap-2 px-6 py-3 border-t border-gray-100">
            <Button
              onClick={handleSave}
              className="bg-pink-500 hover:bg-pink-600 cursor-pointer text-white w-full rounded-full"
            >
              {experience ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
