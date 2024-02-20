import { describe, expect, it } from 'vitest'
import { isArray } from '@/utils/validate'

describe('isArray', () => {
  it('string', () => {
    expect(isArray('')).toBe(false)
  })
  it('number', () => {
    expect(isArray(1)).toBe(false)
  })
  it('boolean', () => {
    expect(isArray(true)).toBe(false)
  })
  it('null', () => {
    expect(isArray(null)).toBe(false)
  })
  it('undefined', () => {
    expect(isArray(undefined)).toBe(false)
  })
  it('symbol', () => {
    expect(isArray(Symbol(''))).toBe(false)
  })
  it('bigInt', () => {
    expect(isArray(BigInt(1))).toBe(false)
  })
  it('object', () => {
    expect(isArray({})).toBe(false)
  })
  it('array Object', () => {
    expect(isArray([])).toBe(true)
  })
})
