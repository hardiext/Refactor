"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EditIcon } from "lucide-react";

interface DescriptionFormDialogProps {
  profileId: string;
  currentDescription?: string;
  onSaved: () => void;
}

export function DescriptionFormDialog({
  profileId,
  currentDescription,
  onSaved,
}: DescriptionFormDialogProps) {
  const supabase = createClient();
  const [description, setDescription] = useState(currentDescription || "");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSave = async () => {
    if (!profileId) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from("profile")
        .update({ description })
        .eq("id", profileId);

      if (error) {
        console.error("Failed to update description:", error.message);
      } else {
        onSaved();
        setOpen(false);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger  asChild>
        <Button
          variant="outline"
          className="shadow-none text-xs border-0 p-2"
          aria-label="Edit Description"
        >
          <EditIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg w-full p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle>Edit Description</DialogTitle>
        </DialogHeader>

        <Textarea
        tabIndex={-1}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your description..."
          className="min-h-[120px] w-full mt-4 resize-none"
        />

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600"
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
