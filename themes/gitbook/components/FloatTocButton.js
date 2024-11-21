import { useGitBookGlobal } from '@/themes/gitbook'

/**
 * Mobile floating directory button
 */
export default function FloatTocButton() {
  const { tocVisible, changeTocVisible } = useGitBookGlobal()

  const toggleToc = () => {
    changeTocVisible(!tocVisible)
  }

  return (
    <div
      onClick={toggleToc}
      className={
        'text-black flex justify-center items-center dark:text-neutral-200 dark:bg-neutral-700 py-2 px-2'
      }
    >
      <a
        id="toc-button"
        className={
          'fa-list-ol cursor-pointer fas hover:scale-150 transform duration-200'
        }
      />
    </div>
  )
}
