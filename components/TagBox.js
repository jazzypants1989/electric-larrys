import { useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Container from "./Container";
import { CheckIcon } from "@heroicons/react/outline";

export default function TagBox({ tags }) {
  const [selectedTag, setSelectedTag] = useState("All");

  return (
    <Container>
      <Combobox
        as="div"
        value={selectedTag}
        onChange={setSelectedTag}
        className="flex items-center justify-between w-full p-0"
      >
        {({ open }) => (
          <>
            <div className="w-32 ml-2">
              <span className="inline-block w-32">
                <Combobox.Label className="w-full text-sm font-base">
                  Tags
                </Combobox.Label>

                <Combobox.Button className="pl-3 py-2 w-32 text-left focus:outline-none focus:shadow-outline-blue focus:border-orange relative border shadow-sm border-Green rounded text-Green hover:text-orange transition-all duration-300 ease-in-out">
                  <span className="block truncate">{selectedTag}</span>
                </Combobox.Button>
              </span>
              <Transition
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options
                  static
                  className="border border-Green rounded mt-1 absolute w-32 bg-blue shadow-lg max-h-60 overflow-y-auto overflow-x-hidden leading-6 z-10"
                >
                  {tags.map((tag) => (
                    <Combobox.Option key={tag} value={tag}>
                      {({ selected, active }) => (
                        <div
                          className={`${
                            active
                              ? "text-blue bg-orange transition-all duration-300 ease-in-out"
                              : "text-Green hover:text-blue transition-all duration-300 ease-in-out"
                          } cursor-pointer select-none relative py-2 pl-10 pr-4`}
                        >
                          <span
                            className={`${
                              selected ? "font-semibold" : "font-normal"
                            }`}
                          >
                            {tag}
                          </span>

                          {selected && (
                            <span
                              className={`${
                                active
                                  ? "text-blue transition-all duration-300 ease-in-out"
                                  : "text-orange transition-all duration-300 ease-in-out"
                              } absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </div>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Transition>
            </div>
          </>
        )}
      </Combobox>
    </Container>
  );
}
