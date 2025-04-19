"use client";

import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

type Option = { id?: string; name: string };

type CreatableMultiSelectProps = {
  label: string;
  options: Option[];
  selected: string[]; // just names
  setSelected: (items: string[]) => void;
};

export function CreatableMultiSelect({
  label,
  options,
  selected,
  setSelected,
}: CreatableMultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");

  const handleSelect = (name: string) => {
    if (selected.includes(name)) {
      setSelected(selected.filter((val) => val !== name));
    } else {
      setSelected([...selected, name]);
    }
  };

  const handleCreate = () => {
    const trimmed = input.trim();
    if (trimmed && !selected.includes(trimmed)) {
      setSelected([...selected, trimmed]);
      setInput("");
      setOpen(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between flex-wrap"
          >
            {selected.length > 0 ? (
              <div className="flex gap-1 flex-wrap">
                {selected.map((name) => (
                  <Badge key={name} className="flex items-center gap-1">
                    {name}
                    <X
                      size={12}
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(name);
                      }}
                    />
                  </Badge>
                ))}
              </div>
            ) : (
              <span>Select or create {label.toLowerCase()}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-full">
          <Command>
            <CommandInput
              placeholder={`Search or create ${label.toLowerCase()}...`}
              value={input}
              onValueChange={setInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleCreate();
                }
              }}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {options.map((option) => (
                <CommandItem
                  key={option.name}
                  onSelect={() => handleSelect(option.name)}
                >
                  <span>{option.name}</span>
                  {selected.includes(option.name) && (
                    <span className="ml-auto text-muted-foreground">✓</span>
                  )}
                </CommandItem>
              ))}
              {input &&
                !options.find((opt) => opt.name === input) &&
                !selected.includes(input) && (
                  <CommandItem
                    onSelect={handleCreate}
                    className="text-blue-600"
                  >
                    Create "{input}"
                  </CommandItem>
                )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
