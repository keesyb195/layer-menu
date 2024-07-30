import { useEffect, useRef, useState, type HTMLAttributes } from 'react';
import { Eye, EyeOff, Lock, Unlock, MoreVertical, Filter } from 'lucide-react';
import { Database, Map } from 'lucide-react';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { getTaskData, isTaskData, type TTask } from './task-data';
import invariant from 'tiny-invariant';
import { createPortal } from 'react-dom';
import {
  attachClosestEdge,
  type Edge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { DropIndicator } from './drop-indicator';

type TaskState =
  | { type: 'idle' }
  | { type: 'preview'; container: HTMLElement }
  | { type: 'is-dragging' }
  | { type: 'is-dragging-over'; closestEdge: Edge | null }
  | { type: 'filtered' };

const stateStyles: { [Key in TaskState['type']]?: HTMLAttributes<HTMLDivElement>['className'] } = {
  'is-dragging': 'opacity-40',
};
const idle: TaskState = { type: 'idle' };

export function Task({ task, onLock, onVisibilityToggle, onOpacityChange }: {
  task: TTask,
  onLock: (taskId: string) => void,
  onVisibilityToggle: (taskId: string) => void,
  onOpacityChange: (taskId: string, opacity: number) => void,
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<TaskState>(idle);
  const [opacity, setOpacity] = useState(task.opacity || 100);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFiltered, setIsFiltered] = useState(task.filtered);

  const handleLockClick = () => onLock(task.id);
  const handleVisibilityClick = () => onVisibilityToggle(task.id);
  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setOpacity(value);
    onOpacityChange(task.id, value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleFilter = () => {
    setIsFiltered(!isFiltered);
    // Update the task's filtered state
    task.filtered = !isFiltered;
  };

  useEffect(() => {
    const element = ref.current;
    invariant(element);
    return combine(
      draggable({
        element,
        canDrag() {
          return !task.locked; // Prevent dragging if the task is locked
        },
        getInitialData() {
          return getTaskData(task);
        },
        onGenerateDragPreview({ nativeSetDragImage }) {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({
              x: '16px',
              y: '8px',
            }),
            render({ container }) {
              setState({ type: 'preview', container });
            },
          });
        },
        onDragStart() {
          setState({ type: 'is-dragging' });
        },
        onDrop() {
          setState(idle);
        },
      }),
      dropTargetForElements({
        element,
        canDrop({ source }) {
          if (source.element === element || task.locked) {
            return false;
          }
          return isTaskData(source.data);
        },
        getData({ input }) {
          const data = getTaskData(task);
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ['top', 'bottom'],
          });
        },
        getIsSticky() {
          return true;
        },
        onDragEnter({ self }) {
          const closestEdge = extractClosestEdge(self.data);
          setState({ type: 'is-dragging-over', closestEdge });
        },
        onDrag({ self }) {
          const closestEdge = extractClosestEdge(self.data);
          setState((current) => {
            if (current.type === 'is-dragging-over' && current.closestEdge === closestEdge) {
              return current;
            }
            return { type: 'is-dragging-over', closestEdge };
          });
        },
        onDragLeave() {
          setState(idle);
        },
        onDrop() {
          setState(idle);
        },
      }),
    );
  }, [task]);
  const getIcon = () => {
    switch (task.type) {
      case 'project-boundary':
        return <Database size={18} className='text-neutral-700 pr-1 :text-blue-600' />;
      case 'data':
        return <Database size={18} className='text-neutral-700 pr-1 :text-blue-600' />;
      case 'drawing':
        return <Map size={18} className='text-neutral-700 pr-1 :text-blue-600' />;
      default:
        return null;
    }
  };
  
  return (
    <>
      <div
        className="relative flex w-full py-0.5 hover:bg-gray-100"
        onMouseEnter={() => setState({ type: 'filtered' })}
        onMouseLeave={() => setState(idle)}
      >
        <div
          data-task-id={task.id}
          ref={ref}
          className={`text-xs flex w-full bg-white hover:bg-neutral-100 text-neutral-600 flex-row items-center rounded p-1.5 hover:cursor-grab group ${stateStyles[state.type] ?? ''}`}
        >
          <div className="w-6 flex justify-center">
            {getIcon()}
          </div>
          
          <span 
            className="task-content overflow-hidden text-ellipsis whitespace-nowrap flex-grow flex-shrink" 
          >
            {task.content}
          </span>
  
          <div className='flex p-0 text-neutral-400 items-center opacity-0 group-hover:opacity-100 transition-opacity'>
            <div className='flex items-center'>
              <input 
                type="number" 
                value={opacity} 
                onChange={handleOpacityChange} 
                className="w-16 rounded-md text-neutral-950 p-1 bg-transparent border border-gray-300 focus:outline-none focus:ring-0"
                min="0" 
                max="100" 
              />
              <span className="ml-1 text-gray-600">%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex-grow">
              {/* Task Content Here */}
            </div>
            <div className="flex items-center ml-2 space-x-2 group">
              <button 
                onClick={toggleFilter} 
                className={`px-2 py-1 rounded ${isFiltered ? 'bg-gray-300' : 'hover:bg-gray-200'} ${isFiltered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
              >
                <Filter size={14} />
              </button>
  
              <button 
                onClick={handleLockClick} 
                className={`px-2 py-1 rounded ${task.locked ? 'text-neutral-800' : 'opacity-0 group-hover:opacity-100'} hover:bg-gray-200`}
              >
                {task.locked ? <Lock size={12} /> : <Unlock size={12} />}
              </button>
  
              <button 
                onClick={handleVisibilityClick} 
                className={`px-2 py-1 rounded ${task.visible ? 'text-neutral-900' : 'opacity-0 group-hover:opacity-100'} hover:bg-gray-200`}
              >
                {task.visible ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
  
              <div className="relative">
                <button 
                  onClick={toggleDropdown} 
                  className="px-2 py-1 rounded hover:bg-white"
                >
                  <MoreVertical size={14} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 z-10 w-44 bg-neutral-50 border border-neutral-100 rounded divide-y divide-gray-700 shadow">
                    <ul className="py-1 text-sm text-neutral-900">
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-neutral-100">
                          <svg className="inline-block w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                          Show legend
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-neutral-100">
                          <svg className="inline-block w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                          </svg>
                          Manage
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-neutral-100">
                          <svg className="inline-block w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                          </svg>
                          Zoom to bounds
                        </a>
                      </li>
                      <li>
                        <a href="#" className="py-2 px-4 text-red-600 hover:bg-neutral-100">
                          <svg className="inline-block w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {state.type === 'is-dragging-over' && state.closestEdge ? (
          <DropIndicator edge={state.closestEdge} gap={'8px'} />
        ) : null}
      </div>
      {state.type === 'preview' ? createPortal(<DragPreview task={task} />, state.container) : null}
    </>
  );
}

function DragPreview({ task }: { task: TTask }) {
  return <div className="border-solid rounded p-2 bg-white">{task.content}</div>;
}