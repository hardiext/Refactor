"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/utils/supabase/client";
import { Plus, X } from "lucide-react";
import { Skill } from "@/types/skill";

type Props = {
  profileId: string;
  skill?: Skill;
  onSaved: () => void;
};

export function SkillFormDialog({ profileId, skill, onSaved }: Props) {
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState<string[]>(skill?.name || []);
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
    if (!profileId) {
      console.error("Profile ID invalid!");
      return;
    }

    try {
      // Hapus semua skill lama
      await supabase.from("skill").delete().eq("profile_id", profileId);

      // Insert skill baru
      if (skills.length > 0) {
        const rows = skills.map((name) => ({ profile_id: profileId, name }));
        const { error } = await supabase.from("skill").insert(rows);
        if (error) throw error;
      }

      onSaved();
      setOpen(false);
    } catch (err) {
      console.error("Failed to save skills:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="ml-2 shadow-none hover:shadow-none bg-white text-black border-0 p-2"
        >
          <Plus className="w-3 h-3" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md p-0 rounded-lg">
        <Card className="overflow-hidden rounded-lg pt-4">
          <CardHeader>
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                Manage Skills
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Tambahkan atau hapus skill kamu
              </DialogDescription>
            </DialogHeader>
          </CardHeader>

          <CardContent className="grid gap-4 py-4 px-6">
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="border-gray-100 shadow-none rounded-sm"
              />
              <Button onClick={handleAddSkill}>Add</Button>
            </div>

            <div className="relative">
              {skills.map((skill, idx) => (
                <div key={idx} className="relative inline-block mr-2 mb-2">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-2 pr-5"
                  >
                    {skill}
                  </Badge>
                  <X
                    className="absolute top-1.5 right-1 w-3 h-3 cursor-pointer"
                    onClick={() => handleRemoveSkill(idx)}
                  />
                </div>
              ))}
            </div>
          </CardContent>

          <DialogFooter className="flex justify-end gap-2 px-6 py-3 border-t border-gray-100">
            <Button
              onClick={handleSave}
              className="bg-pink-500 hover:bg-pink-600 cursor-pointer text-white w-full rounded-full"
            >
              Save
            </Button>
          </DialogFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
