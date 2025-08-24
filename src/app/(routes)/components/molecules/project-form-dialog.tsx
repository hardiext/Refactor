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
import { Project } from "@/types/project";

type Props = {
  project?: Project;
  profileId: string;
  onSaved: () => void;
};

export function ProjectFormDialog({ project, profileId, onSaved }: Props) {
  const supabase = createClient();
  const [open, setOpen] = useState(false);

  const [projectTitle, setProjectTitle] = useState(
    project?.project_title || ""
  );
  const [description, setDescription] = useState(project?.description || "");
  const [skills, setSkills] = useState<string[]>(project?.skills || []);
  const [period, setPeriod] = useState(project?.priode || "");
  const [fileUrl, setFileUrl] = useState(project?.file_url || "");
  const [link, setLink] = useState(project?.link || "");
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
      project_title: projectTitle,
      description,
      skills,
      priode: period,
      file_url: fileUrl,
      link: link || null,
    };

    if (project?.id) {
      const { error } = await supabase
        .from("project")
        .update(data)
        .eq("id", project.id);
      if (error) console.error(error);
    } else {
      const { error } = await supabase.from("project").insert([data]);
      if (error) console.error(error);
    }

    onSaved();
    setOpen(false);
  };

  const handleDelete = async () => {
    if (!project?.id) return;
    const confirmed = confirm(
      "Are you sure you want to delete this experience?"
    );
    if (!confirmed) return;

    const { error } = await supabase
      .from("project")
      .delete()
      .eq("id", project.id);
    if (!error) {
      onSaved();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
       
        onClick={() => setOpen(true)}
        className="ml-2 shadow-none hover:shadow-none hover:bg-transparent bg-white text-black border-0 transition"
      >
        {project ? <EditIcon className="w-4 h-4" /> : <Plus />}
      </Button>

      <DialogContent className="sm:max-w-lg p-0 rounded-lg">
        <Card className="overflow-hidden rounded-lg py-0 gap-0  pt-4">
          <div className="max-h-[80vh] overflow-y-auto">
            <CardHeader className="">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                  {project ? "Edit" : "Add"} Experience
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  Isi Project Anda
                </DialogDescription>
              </DialogHeader>
            </CardHeader>
            <CardContent className="grid gap-4 py-4 px-6  ">
              <div>
                <label
                  className="text-sm font-normal mb-2 block"
                  htmlFor="project-title"
                >
                  Project Title
                </label>
                <Input
                  tabIndex={-1}
                  id="project-title"
                  placeholder="Project Title"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="border-gray-100 shadow-none rounded-sm text-xs"
                />
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
                  className="border-gray-100 shadow-none rounded-sm text-xs"
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
                  className="border-gray-100 shadow-none rounded-sm text-xs"
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
                    className="border-gray-100 shadow-none rounded-sm text-xs"
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
              </div>
              <div>
                <div>
                  <label
                    className="text-sm font-normal mb-2 block"
                    htmlFor="file-url"
                  >
                    Logo URL
                  </label>
                  <Input
                    tabIndex={-1}
                    id="file-url"
                    placeholder="Logo URL"
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    className="border-gray-100 shadow-none rounded-sm text-xs"
                  />
                </div>
              </div>

              <div>
                <label
                  className="text-sm font-normal mb-2 block"
                  htmlFor="link"
                >
                 Link (optional)
                </label>
                <Input
                  tabIndex={-1}
                  id="link"
                  placeholder="Project Link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="border-gray-100 shadow-none rounded-sm text-xs"
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
              {project ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
