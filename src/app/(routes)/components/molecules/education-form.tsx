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
import { Education } from "@/types/education";

type Props = {
  education?: Education;
  profileId: string;
  onSaved: () => void;
};

export function EducationFormDialog({ education, profileId, onSaved }: Props) {
  const supabase = createClient();
  const [open, setOpen] = useState(false);

  const [instutution, setInstitution] = useState(education?.institution || "");
  const [institutionUrl, setInstitutionUrl] = useState(
    education?.institution_url || ""
  );
  const [title, setTitle] = useState(education?.title || "");
  const [startDate, setStartDate] = useState(education?.start_date || "");
  const [endDate, setEndDate] = useState(education?.end_date || "");
  const [description, setDescription] = useState(education?.description || "");
  const [field, setField] = useState(education?.field || "");

  const handleSave = async () => {
    const data = {
      profile_id: profileId,
      institution: instutution,
      institution_url: institutionUrl || null,
      title,
      field: field || null,
      start_date: startDate || null,
      end_date: endDate || null,
      description: description || null,
    };

    if (education?.id) {
      const { error } = await supabase
        .from("education")
        .update(data)
        .eq("id", education.id);
      if (error) console.error(error);
    } else {
      const { error } = await supabase.from("education").insert([data]);
      if (error) console.error(error);
    }

    onSaved();
    setOpen(false);
  };

  const handleDelete = async () => {
    if (!education?.id) return;
    const confirmed = confirm(
      "Are you sure you want to delete this experience?"
    );
    if (!confirmed) return;

    const { error } = await supabase
      .from("education")
      .delete()
      .eq("id", education.id);
    if (!error) {
      onSaved();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="ml-2 shadow-none border-0 hover:shadow-lg transition"
      >
        {education ? <EditIcon className="w-4 h-4" /> : <Plus />}
      </Button>

      <DialogContent className="sm:max-w-lg p-0 rounded-lg">
        <Card className="overflow-hidden rounded-lg py-0 gap-0  pt-4">
          <div className="max-h-[80vh] overflow-y-auto">
            <CardHeader className="">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                  {education ? "Edit" : "Add"} Experience
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
                  Institution
                </label>
                <Input
                  id="company"
                  placeholder="Company"
                  value={instutution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="border-gray-100 shadow-none rounded-sm"
                />
              </div>
              <div>
                <label
                  className="text-sm font-normal mb-2 block"
                  htmlFor="role"
                >
                  Degree
                </label>
                <Input
                  id="role"
                  placeholder="Role"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-gray-100 shadow-none rounded-sm"
                />
              </div>
              <div>
                <label
                  className="text-sm font-normal mb-2 block"
                  htmlFor="field"
                >
                Field of Study
                </label>
                <Input
                  id="field"
                  placeholder="Field of Study"
                  value={field}
                  onChange={(e) => setField(e.target.value)}
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
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border-gray-100 shadow-none rounded-sm"
                />
              </div>
              <div>
                <div>
                  <label
                    className="text-sm font-normal mb-2 block"
                    htmlFor="logo-url"
                  >
                    Logo Institution
                  </label>
                  <Input
                    id="logo-url"
                    placeholder="Logo URL"
                    value={institutionUrl}
                    onChange={(e) => setInstitutionUrl(e.target.value)}
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
                  id="description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border-gray-100 shadow-none rounded-sm"
                />
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={handleDelete}
                  className="text-sm font-medium text-neutral-800 cursor-pointer"
                >
                  Delete Experience
                </button>
              </div>
            </CardContent>
          </div>

          <DialogFooter className="flex justify-end gap-2 px-6 py-3 border-t border-gray-100">
            <Button
              onClick={handleSave}
              className="bg-pink-500 hover:bg-pink-600 cursor-pointer text-white w-full rounded-full"
            >
              {education ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
