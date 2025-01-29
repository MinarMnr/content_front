import { SidebarMenu } from "@/app/lib/sidebar";

export const menu_list: SidebarMenu[] = [
  {
    id: 1,
    title: "Dashboard",
    path: "",
    icon: "Squares2X2Icon",
  },
  {
    id: 7861,
    title: "Courses",
    path: "courses",
    icon: "Cog8ToothIcon",
    actions: [
      {
        tooltip: "Add",
        icon: "PlusIcon",
        path: "add",
        type: "no-table",
      },
      {
        tooltip: "Edit",
        icon: "PencilIcon",
        path: "edit",
        type: "no-table",
      },
      {
        tooltip: "Delete",
        icon: "PencilIcon",
        action: "delete",
        type: "no-table",
      },
    ],
  },
  {
    id: 7862,
    title: "E-book",
    path: "ebook",
    icon: "BookOpenIcon",
    actions: [
      {
        tooltip: "Add",
        icon: "PlusIcon",
        path: "add",
        type: "no-table",
      },
      {
        tooltip: "Edit",
        icon: "PencilIcon",
        path: "edit",
        type: "no-table",
      },
      {
        tooltip: "Delete",
        icon: "PencilIcon",
        action: "delete",
        type: "no-table",
      },
    ],
  },
  {
    id: 7863,
    title: "New Course Request",
    path: "request-course",
    icon: "BookOpenIcon",
    actions: [

      {
        tooltip: "Delete",
        icon: "PencilIcon",
        action: "delete",
        type: "no-table",
      },
    ],
  },
  {
    id: 2,
    title: "Settings",
    path: "settings",
    icon: "CogIcon",

    permissions: [
      {
        id: 3,
        title: "Category Type",
        path: "category-type",
        icon: "Cog8ToothIcon",
        actions: [
          {
            tooltip: "Add",
            icon: "PlusIcon",
            path: "add",
            type: "no-table",
          },
          {
            tooltip: "Edit",
            icon: "PencilIcon",
            path: "edit",
            type: "no-table",
          },
          {
            tooltip: "Delete",
            icon: "PencilIcon",
            action: "delete",
            type: "no-table",
          },
        ],
      },
      {
        id: 4,
        title: "Category",
        path: "category",
        icon: "Cog8ToothIcon",
        actions: [
          {
            tooltip: "Add",
            icon: "PlusIcon",
            path: "add",
            type: "no-table",
          },
          {
            tooltip: "Edit",
            icon: "PencilIcon",
            path: "edit",
            type: "no-table",
          },
          {
            tooltip: "Delete",
            icon: "PencilIcon",
            action: "delete",
            type: "no-table",
          },
        ],
      },
      {
        id: 5,
        title: "Sub-Category",
        path: "sub-category",
        icon: "Cog8ToothIcon",
        actions: [
          {
            tooltip: "Add",
            icon: "PlusIcon",
            path: "add",
            type: "no-table",
          },
          {
            tooltip: "Edit",
            icon: "PencilIcon",
            path: "edit",
            type: "no-table",
          },
          {
            tooltip: "Delete",
            icon: "PencilIcon",
            action: "delete",
            type: "no-table",
          },
        ],
      },
      {
        id: 6,
        title: "Coupon",
        path: "coupon",
        icon: "GiftIcon",
        actions: [
          {
            tooltip: "Add",
            icon: "PlusIcon",
            path: "add",
            type: "no-table",
          },
          {
            tooltip: "Edit",
            icon: "PencilIcon",
            path: "edit",
            type: "no-table",
          },
          {
            tooltip: "Delete",
            icon: "PencilIcon",
            action: "delete",
            type: "no-table",
          },
        ],
      },

      {
        id: 7,
        title: "Terms and Condition",
        path: "term",
        icon: "Cog8ToothIcon",
        actions: [
          {
            tooltip: "Add",
            icon: "PlusIcon",
            path: "add",
            type: "no-table",
          },
          {
            tooltip: "Edit",
            icon: "PencilIcon",
            path: "edit",
            type: "no-table",
          },
          {
            tooltip: "Delete",
            icon: "PencilIcon",
            action: "delete",
            type: "no-table",
          },
        ],
      },
      {
        id: 8,
        title: "Privacy Policy",
        path: "privacy-policy",
        icon: "Cog8ToothIcon",
        actions: [
          {
            tooltip: "Add",
            icon: "PlusIcon",
            path: "add",
            type: "no-table",
          },
          {
            tooltip: "Edit",
            icon: "PencilIcon",
            path: "edit",
            type: "no-table",
          },
          {
            tooltip: "Delete",
            icon: "PencilIcon",
            action: "delete",
            type: "no-table",
          },
        ],
      },

      {
        id: 9,
        title: "Refund Policy",
        path: "refund-policy",
        icon: "Cog8ToothIcon",
        actions: [
          {
            tooltip: "Add",
            icon: "PlusIcon",
            path: "add",
            type: "no-table",
          },
          {
            tooltip: "Edit",
            icon: "PencilIcon",
            path: "edit",
            type: "no-table",
          },
          {
            tooltip: "Delete",
            icon: "PencilIcon",
            action: "delete",
            type: "no-table",
          },
        ],
      },
    ],
  },
];
