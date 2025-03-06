import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "../Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const Card = ({ id, heading, description, createdAt, onDelete, onEdit }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editHeading, setEditHeading] = useState(heading);
  const [editDescription, setEditDescription] = useState(description);

  const handleDelete = () => {
    onDelete(id);
    setIsDeleteOpen(false);
  };

  const handleSaveEdit = () => {
    onEdit(id, editHeading, editDescription);
    setIsEditOpen(false);
  };

  return (
    <div className="h-full w-full rounded-lg bg-white shadow-lg">
      <div className="p-4">
        <h2 className="mb-2 text-xl font-semibold">{heading}</h2>
        <p className="text-gray-700">{description}</p>
        <div className="mt-4 flex h-full flex-row items-center gap-2">
          <p className="flex-1 text-left text-sm text-gray-500">
            Created at: {new Date(createdAt).toLocaleString()}
          </p>
          <div className="flex gap-2">
            <Button color="blue" onClick={() => setIsEditOpen(true)} message="Edit" />
            <Button color="red" onClick={() => setIsDeleteOpen(true)} message="Delete" />
          </div>
        </div>
      </div>


      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
          </DialogHeader>
          <p>Apakah Anda yakin ingin menghapus note ini?</p>
          <DialogFooter>
            <Button color="gray" onClick={() => setIsDeleteOpen(false)} message="Batal" />
            <Button color="red" onClick={handleDelete} message="Hapus" />
          </DialogFooter>
        </DialogContent>
      </Dialog>

  
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <label>
              <span className="text-sm font-semibold">Judul</span>
              <input
                type="text"
                value={editHeading}
                onChange={(e) => setEditHeading(e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 p-2"
              />
            </label>
            <label>
              <span className="text-sm font-semibold">Deskripsi</span>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 p-2"
                rows="3"
              />
            </label>
          </div>
          <DialogFooter>
            <Button color="gray" onClick={() => setIsEditOpen(false)} message="Batal" />
            <Button color="blue" onClick={handleSaveEdit} message="Simpan" />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
