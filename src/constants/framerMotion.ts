export const VARIANTS = {
  hidden:{
    opacity: 0
  },
  visible:(index:number)=>({
    opacity: 1,
    transition:{
      delay: 0.1 * index,
    }
  })
}