import { renderHook, act } from '@testing-library/react'
import { createContext, useState } from 'react'
import useEventEmitter from '../useEventEmitter'
import EventEmitter, { BaseEvents } from '@/utils/EventEmitter'

describe('useEventEmitter', () => {
  interface CountEvents extends BaseEvents {
    add: [number]
  }
  const eventEmitterContext = createContext<EventEmitter<CountEvents>>(
    new EventEmitter<CountEvents>(),
  )

  const setUp = () =>
    renderHook(() => {
      const { emit, useListener } = useEventEmitter(eventEmitterContext)
      const [count, setCount] = useState(0)
      useListener
      useListener('add', (val) => {
        setCount((c) => c + val)
      })
      useListener('add', (val) => {
        setCount((c) => c + val + 10)
      })
      useListener('sub', (val) => {
        setCount((c) => c - val)
      })
      return {
        emit,
        count,
      }
    })

  it('emit and listener should work', () => {
    const hook = setUp()
    act(() => {
      hook.result.current.emit('add', 2)
    })
    expect(hook.result.current.count).toBe(14)
    act(() => {
      hook.result.current.emit('sub', 1)
    })
    expect(hook.result.current.count).toBe(13)
    act(() => {
      hook.result.current.emit('add', 2)
    })
    expect(hook.result.current.count).toBe(27)
  })
})
