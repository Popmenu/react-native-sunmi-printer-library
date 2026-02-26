import { NativeModules } from 'react-native'
import { prepare, printText } from '../index'


jest.mock('react-native', () => ({
  NativeModules: {
    SunmiPrinterLibrary: {
      connect: jest.fn().mockResolvedValue(true),
      disconnect: jest.fn().mockResolvedValue(true),
      printerInit: jest.fn().mockResolvedValue(true),
      setDefaultFontSize: jest.fn().mockResolvedValue(true),
      setFontSize: jest.fn().mockResolvedValue(true),
      printText: jest.fn().mockResolvedValue(true),
    },
    SunmiScannerLibrary: {
      scan: jest.fn().mockResolvedValue('scanned_data'),
    },
  },
  Platform: {
    select: jest.fn((obj) => obj.android),
  },
}))

describe('SunmiPrinterLibrary', () => {
  it('should be able to prepare the printer', async () => {
    const result = await prepare()
    expect(result).toBe(true)
  })

  it('should be able to print text', async () => {
    const text = 'Hello, printer!'
    await printText(text)
    expect(NativeModules.SunmiPrinterLibrary.printText).toHaveBeenCalledWith(
      text
    )
  })
})
