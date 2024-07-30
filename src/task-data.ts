export type TTask = {
  children: TTask[];
  id: string;
  content: string;
  locked: boolean;
  visible: boolean;
  filtered: boolean;
  active: boolean;
  opacity: number;
  type: 'project-boundary' | 'data' | 'drawing'; 
};

const taskDataKey = Symbol('task');

export type TTaskData = { [taskDataKey]: true; taskId: TTask['id'] };

export function getTaskData(task: TTask): TTaskData {
  return { [taskDataKey]: true, taskId: task.id };
}

export function isTaskData(data: Record<string | symbol, unknown>): data is TTaskData {
  return data[taskDataKey] === true;
}
const tasks: TTask[] = [
  {
    id: 'layer-0', content: 'Drawing C', locked: false, visible: false, filtered: false, active: false, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-1', content: 'Other Drawing', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-2', content: 'Map', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-3', content: 'Drawing', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-4', content: 'Base map', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-5', content: 'Project layer', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-6', content: 'Site Plan', locked: true, visible: false, filtered: true, active: false, opacity: 80, children: [],
    type: "drawing"
  },
  {
    id: 'layer-7', content: 'Survey Data', locked: false, visible: true, filtered: false, active: true, opacity: 90, children: [],
    type: "data"
  },
  {
    id: 'layer-8', content: 'Topographic Map', locked: true, visible: false, filtered: true, active: false, opacity: 70, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-9', content: 'Elevation Drawing', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-10', content: 'Geological Data', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-11', content: 'Boundary Map', locked: true, visible: false, filtered: true, active: false, opacity: 60, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-12', content: 'New Drawing 1', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-13', content: 'New Data 1', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-14', content: 'New Project Boundary 1', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-15', content: 'New Drawing 2', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-16', content: 'New Data 2', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-17', content: 'New Project Boundary 2', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-18', content: 'New Drawing 3', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-19', content: 'New Data 3', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-20', content: 'New Project Boundary 3', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-21', content: 'New Drawing 4', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-22', content: 'New Data 4', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-23', content: 'New Project Boundary 4', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-24', content: 'New Drawing 5', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-25', content: 'New Data 5', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-26', content: 'New Project Boundary 5', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-27', content: 'New Drawing 6', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-28', content: 'New Data 6', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-29', content: 'New Project Boundary 6', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-30', content: 'New Drawing 7', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-31', content: 'New Data 7', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-32', content: 'New Project Boundary 7', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-33', content: 'New Drawing 8', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-34', content: 'New Data 8', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-35', content: 'New Project Boundary 8', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-36', content: 'New Drawing 9', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-37', content: 'New Data 9', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-38', content: 'New Project Boundary 9', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-39', content: 'New Drawing 10', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-40', content: 'New Data 10', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-41', content: 'New Project Boundary 10', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-42', content: 'New Drawing 11', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-43', content: 'New Data 11', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-44', content: 'New Project Boundary 11', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-45', content: 'New Drawing 12', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-46', content: 'New Data 12', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-47', content: 'New Project Boundary 12', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-48', content: 'New Drawing 13', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-49', content: 'New Data 13', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-50', content: 'New Project Boundary 13', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-51', content: 'New Drawing 14', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-52', content: 'New Data 14', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-53', content: 'New Project Boundary 14', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-54', content: 'New Drawing 15', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-55', content: 'New Data 15', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-56', content: 'New Project Boundary 15', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-57', content: 'New Drawing 16', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-58', content: 'New Data 16', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-59', content: 'New Project Boundary 16', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-60', content: 'New Drawing 17', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-61', content: 'New Data 17', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-62', content: 'New Project Boundary 17', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-63', content: 'New Drawing 18', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-64', content: 'New Data 18', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-65', content: 'New Project Boundary 18', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-66', content: 'New Drawing 19', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-67', content: 'New Data 19', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-68', content: 'New Project Boundary 19', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-69', content: 'New Drawing 20', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-70', content: 'New Data 20', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-71', content: 'New Project Boundary 20', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-72', content: 'New Drawing 21', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-73', content: 'New Data 21', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-74', content: 'New Project Boundary 21', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-75', content: 'New Drawing 22', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-76', content: 'New Data 22', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-77', content: 'New Project Boundary 22', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-78', content: 'New Drawing 23', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-79', content: 'New Data 23', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-80', content: 'New Project Boundary 23', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-81', content: 'New Drawing 24', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-82', content: 'New Data 24', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-83', content: 'New Project Boundary 24', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-84', content: 'New Drawing 25', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-85', content: 'New Data 25', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-86', content: 'New Project Boundary 25', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  {
    id: 'layer-87', content: 'New Drawing 26', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "drawing"
  },
  {
    id: 'layer-88', content: 'New Data 26', locked: false, visible: true, filtered: false, active: true, opacity: 100, children: [],
    type: "data"
  },
  {
    id: 'layer-89', content: 'New Project Boundary 26', locked: false, visible: false, filtered: false, active: true, opacity: 100, children: [],
    type: "project-boundary"
  },
  // Add more tasks as needed
];

export function getTasks() {
  return tasks;
}
