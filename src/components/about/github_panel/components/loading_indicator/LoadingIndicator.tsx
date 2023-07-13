import styles from './LoadingIndicator.module.css'

export default function PanelLoadingIndicator () {
  return (
    <div className='w-full h-full flex flex-col justify-around items-center'>
      <h1>Loading My GitHub Dominance...</h1>
      <div className={styles.loading_indicator}>
        <svg className={styles.circular_loader} viewBox='25 25 50 50'>
          <circle
            className={styles.loader_path}
            cx='50'
            cy='50'
            r='20'
          ></circle>
        </svg>
      </div>
    </div>
  )
}
