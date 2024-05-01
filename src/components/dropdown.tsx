import { Menu } from "@headlessui/react";
import { CaretDown } from "@phosphor-icons/react";

type DropdownProps = {
  title: string;
  items: string[];
  activeItem: string;
  onItemChange?: (item: string) => void;
};

export function Dropdown({
  title,
  items,
  activeItem,
  onItemChange,
}: DropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          {activeItem}
          <CaretDown className="ml-2 -mr-1 h-5 w-5" />
        </Menu.Button>
      </div>
      <Menu.Items className="absolute right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {items.map((item) => (
          <Menu.Item key={item}>
            {({ active }) => (
              <button
                onClick={() => onItemChange && onItemChange(item)}
                className={`${
                  active ? "bg-gray-100" : ""
                } group flex items-center w-full px-4 py-2 text-sm text-gray-900`}
              >
                {item}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
