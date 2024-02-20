import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Test from './test.vue'

describe('test', () => {
  it('should pass', () => {
    expect(true).toBe(true)
  })

  it('should render', () => {
    const wrapper = mount(Test)
    expect(wrapper.html()).toContain('ann')
  })
})
