

export const utilService = {
      debounce
}

function debounce(func: Function, timeout = 1000) {
      let timer: ReturnType<typeof setTimeout>
      return function (this: any, ...args: any[]) {
            clearTimeout(timer)
            timer = setTimeout(() => { func.apply(this, args) }, timeout)
      }
}

