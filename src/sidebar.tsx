import { useEffect, useState, useRef } from 'react';
import { Save } from 'lucide-react';

import { getTasks, type TTask } from './task-data';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { isTaskData } from './task-data';
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
import { triggerPostMoveFlash } from '@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash';
import { flushSync } from 'react-dom';
import { Task } from './task';

const SIDEBAR_WIDTHS = {
  tucked: 0,
  small: 350,
  max: 600,
};

export function Sidebar() {
  const [tasks, setTasks] = useState<TTask[]>(() => getTasks());
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_WIDTHS.small);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);
  const startX = useRef(0);

  const handleOpacityChange = (taskId: string, newOpacity: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, opacity: newOpacity } : task
      )
    );
  };

  const handleToggle = (taskId: string, property: keyof TTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, [property]: !task[property] } : task
      )
    );
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing.current) {
        setSidebarWidth((prevWidth) => {
          const newWidth = prevWidth + (e.clientX - startX.current);
          if (newWidth < SIDEBAR_WIDTHS.tucked) return SIDEBAR_WIDTHS.tucked;
          if (newWidth > SIDEBAR_WIDTHS.max) return SIDEBAR_WIDTHS.max;
          return newWidth;
        });
        startX.current = e.clientX;
      }
    };
    const handleMouseUp = () => {
      isResizing.current = false;
      // Remove snap points for smoother resizing
      if (sidebarWidth < SIDEBAR_WIDTHS.tucked) {
        setSidebarWidth(SIDEBAR_WIDTHS.tucked);
      } else if (sidebarWidth > SIDEBAR_WIDTHS.max) {
        setSidebarWidth(SIDEBAR_WIDTHS.max);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [sidebarWidth]);

  useEffect(() => {
    const unsubscribe = monitorForElements({
      canMonitor({ source }) {
        return isTaskData(source.data);
      },
      onDrop({ location, source }) {
        const target = location.current.dropTargets[0];
        if (!target) return;

        const sourceData = source.data;
        const targetData = target.data;
        if (!isTaskData(sourceData) || !isTaskData(targetData)) return;

        const indexOfSource = tasks.findIndex((task) => task.id === sourceData.taskId);
        const indexOfTarget = tasks.findIndex((task) => task.id === targetData.taskId);
        if (indexOfSource < 0 || indexOfTarget < 0) return;

        const closestEdgeOfTarget = extractClosestEdge(targetData);
        flushSync(() => {
          setTasks(reorderWithEdge({
            list: tasks,
            startIndex: indexOfSource,
            indexOfTarget,
            closestEdgeOfTarget,
            axis: 'vertical',
          }));
        });

        const element = document.querySelector(`[data-task-id="${sourceData.taskId}"]`) as HTMLElement;
        if (element) {
          triggerPostMoveFlash(element);
        }
      },
    });

    return () => unsubscribe();
  }, [tasks]);

  const startResizing = (e: React.MouseEvent) => {
    isResizing.current = true;
    startX.current = e.clientX;
  };

  const toggleSidebar = () => {
    if (sidebarWidth === SIDEBAR_WIDTHS.tucked) {
      setSidebarWidth(SIDEBAR_WIDTHS.small);
    } else {
      setSidebarWidth(SIDEBAR_WIDTHS.tucked);
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        style={{ width: sidebarWidth }}
        className="fixed top-0 left-0 z-40 h-screen transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full w-full px-2 py-10 overflow-y-auto bg-white border-r-2 border-r-neutral-100">
          <form className="max-w-md mx-auto mb-4">
            <label htmlFor="default-search" className="sr-only mb-2 text-sm font-medium text-neutral-800">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="size-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" aria-hidden="true">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              
              <input
                type="search"
                id="default-search"
                className="w-full p-3 pl-10 text-sm text-neutral-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-neutral-500 focus:border-neutral-500"
                placeholder="Search Mockups, Logos..."
                required
              />
              <button
                type="submit"
                className="absolute right-2 bottom-2 focus:ring-4 cursor-pointer rounded-md bg-gray-200/80 text-sm p-1.5 px-2 text-neutral-600 transition active:scale-[.95]"
              >
                Search
              </button>
            </div>
          </form>

          <div className="pt-4 self-center text-lg font-semibold whitespace-nowrap text-neutral-750">
            Layers
          </div>

          <div className="my-4">
            <div className='flex gap-2'>
              <button className="text-xs inline-flex h-8 items-center justify-center rounded-md bg-neutral-100 border border-neutral-800/10 px-3 font-medium text-neutral-800 transition active:scale-95">
                <svg className="w-4 h-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Data Layer
              </button>


              <button className="text-xs inline-flex h-8 items-center justify-center rounded-md bg-neutral-50 border border-neutral-100 px-3 font-medium text-neutral-500 transition active:scale-95">
                <Save size={16} />
              </button>

            </div>
          </div>

          <div className="my-0 mx-auto">
            <ul className="pt-4 space-y-2 font-medium border-t border-neutral-100">
              <div className="flex flex-col">
                {tasks.map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    onLock={(taskId) => handleToggle(taskId, 'locked')}
                    onVisibilityToggle={(taskId) => handleToggle(taskId, 'visible')}
                    onOpacityChange={handleOpacityChange} // Pass the new handler
                  />
                ))}
              </div>
            </ul>
          </div>
        </div>
        <div
          className="absolute right-0 top-0 h-full w-2 bg-gray-300 cursor-ew-resize"
          onMouseDown={startResizing}
        >
          <div className="h-full w-full flex items-center justify-center">
            <div className="h-12 w-1 bg-gray-500"></div>
          </div>
        </div>
      </aside>
      <button
        onClick={toggleSidebar}
        className="fixed bottom-2 z-50 bg-gray-200 p-2 rounded transition-transform"
        style={{ left: sidebarWidth === SIDEBAR_WIDTHS.tucked ? '10px' : `calc(${sidebarWidth}px + 10px)` }}
      >
        {sidebarWidth === SIDEBAR_WIDTHS.tucked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        )}
      </button>
    </>
  )
}