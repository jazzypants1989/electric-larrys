"use client"

import { ChangeEvent, useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

export default function TagGuy({
  tags,
  namedTags,
}: {
  tags: string[]
  namedTags: string[]
}) {
  const { register, setValue } = useFormContext()

  const [tagList, setTagList] = useState<string[]>(tags)
  const [tagInput, setTagInput] = useState("")
  const [tagOptions, setTagOptions] = useState<string[]>([])

  const handleTagInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value)
  }

  useEffect(() => {
    const filteredTags = namedTags
      .filter((tag) => tag.toLowerCase().includes(tagInput.toLowerCase()))
      .filter((tag) => !tagList.includes(tag))
    setTagOptions(filteredTags)
  }, [tagInput]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleTagAdd = (tag: string) => {
    const filteredTags = namedTags.filter(
      (tag) =>
        tag.toLowerCase().includes(tagInput.toLowerCase()) &&
        tag !== tagInput &&
        !tagList.includes(tag)
    )
    if (tagList.includes(tag)) return
    if (tag.length === 0) return
    setTagList([...tagList, tag])
    setTagInput("")
    setTagOptions(filteredTags.filter((t) => t !== tag))
    setValue("tags", [...tagList, tag])
  }

  const handleTagRemove = (tag: string) => {
    const filteredTags = tagList.filter((t) => t !== tag)
    setTagList(filteredTags)
    setValue("tags", filteredTags)
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="tags" className="text-lg font-bold">
        {tags.length > 0 ? "Selected Tags" : "Add Tags"}
      </label>
      <div className="flex flex-row flex-wrap">
        {tagList.map((tag) => (
          <div
            key={tag}
            className="m-2 rounded-md border-2 border-orange bg-orange p-2"
          >
            {tag}
            <button
              type="button"
              className="ml-2"
              onClick={() => handleTagRemove(tag)}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <h3 className="text-lg font-bold">Search or Add New Tag</h3>
      <div className="flex flex-col items-start justify-between">
        <input
          type="text"
          className="h-10 w-5/6 rounded-md border-2 border-orange p-2"
          placeholder="Add a new tag or search for an existing one and it will show up below"
          value={tagInput}
          onChange={handleTagInput}
        />
        {tagInput.length > 0 && (
          <button
            type="button"
            className="m-1 rounded-md border-2 border-Green bg-Green p-1 text-orange"
            onClick={() => handleTagAdd(tagInput)}
          >
            {tagList.includes(tagInput)
              ? "Tag Already Added"
              : "Add Tag " + tagInput}
          </button>
        )}
        <div className="flex flex-row flex-wrap">
          {tagOptions.length > 0 && (
            <h3 className="text-lg font-bold text-orange drop-shadow">
              Existing Tags
            </h3>
          )}
          {tagOptions
            .map((tag) => (
              <button
                key={tag}
                className="m-2 rounded-md border-2 border-orange bg-orange p-2"
                onClick={() => handleTagAdd(tag)}
                type="button"
              >
                {tag}
              </button>
            ))
            .slice(0, 10)}
        </div>
      </div>
      <input type="hidden" {...register("tags")} value={tagList} />
    </div>
  )
}
