const os = require("node:os")

module.exports = (process) => {
  // .rss => Resident Set Size (RSS) of the current Node.js process only. Reflects the amount of physical memory currently allocated to that specific process by the OS. Includes both actively used memory and cached memory.
  // os.totalmem() =>  total physical memory available on the system as a whole.
  //amount of memory actively used by the process in the V8 heap.
  
  const memoryUsage = process.memoryUsage()
  const totalMemoryMB = Math.round(memoryUsage.rss / 1024 / 1024)
  const usedMemoryMB = Math.round(memoryUsage.heapUsed / 1024 / 1024)
  const freeMemoryMB = Math.round(
    memoryUsage.heapTotal / 1024 / 1024 - usedMemoryMB
  )
  const memoryInfo = {
    systemTotalMemory: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(3)} GB`,
    processTotalMemory: `${totalMemoryMB} MB`,
    processUsedMemory: `${usedMemoryMB} MB`,
    processFreeMemory: `${freeMemoryMB} MB`,
  }

  const cpuUsage = process.cpuUsage()
  const userUsage = Math.round(cpuUsage.user / 1000)
  const systemUsage = Math.round(cpuUsage.system / 1000)
  const cpuInfo = { user: `${userUsage} ms`, system: `${systemUsage} ms` }

  return { memoryInfo, cpuInfo }
}
