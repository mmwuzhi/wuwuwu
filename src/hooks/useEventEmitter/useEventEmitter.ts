import EventEmitter, { type BaseEvents } from '@/utils/EventEmitter'
import { DependencyList, useCallback, useContext, useEffect, useRef } from 'react'

function useEmit<Events extends BaseEvents>(eventEmitter: EventEmitter<Events>) {
  return useCallback(
    <E extends keyof Events>(type: E, ...args: Events[E]) => {
      eventEmitter.emit(type, ...args)
    },
    [eventEmitter],
  )
}

const useEventEmitter = <Events extends BaseEvents>(
  eventEmitterContext: React.Context<EventEmitter<Events>>,
) => {
  const eventEmitter = useContext(eventEmitterContext)
  const emit = useEmit(eventEmitter)

  return {
    useListener: <E extends keyof Events>(
      type: E,
      listener: (...args: Events[E]) => void,
      deps: DependencyList = [],
    ) => {
      const callbackRef = useRef<typeof listener>(null as any)
      callbackRef.current = listener

      useEffect(() => {
        eventEmitter.add(type, callbackRef.current)
        return () => {
          eventEmitter.remove(type, callbackRef.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [type, ...deps])
    },
    emit,
  }
}

export default useEventEmitter
