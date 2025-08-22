"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EditIcon } from "lucide-react";

export function DescriptionFormDialog({
  profileId,
  currentDescription,
  onSaved,
}: {
  profileId: string;
  currentDescription?: string;
  onSaved: () => void;
}) {
  const supabase = createClient();
  const [description, setDescription] = useState(currentDescription || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!profileId) return;
    setLoading(true);

    const { error } = await supabase
      .from("profile")
      .update({ description })
      .eq("id", profileId);

    setLoading(false);

    if (!error) {
      onSaved(); 
    } else {
      console.error("Failed to update description:", error.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="shadow-none text-xs border-0">
            <EditIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Description</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your description..."
            className="min-h-[120px]"
          />
          <Button onClick={handleSave} disabled={loading} className="bg-pink-500">
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
