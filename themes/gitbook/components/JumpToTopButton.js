/**
 * Jump to top of page
 * This control will appear when the screen slides down 500 pixels
 * @param targetRef Target html tag with associated height
 * @param showPercent Whether to display percentage
 * @returns {JSX.Element}
 * @constructor
 */
const JumpToTopButton = ({ showPercent = false, percent, className }) => {
  return (
    <div
      id="jump-to-top"
      data-aos="fade-up"
      data-aos-duration="300"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
      className="fixed xl:right-80 right-2 mr-10 bottom-28 z-20 "
    >
      <i
        className="fas fa-chevron-up hover:scale-110 duration-150 cursor-pointer p-2 rounded-full border text-white text-xs bg-neutral-700"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      />
    </div>
  )
}

export default JumpToTopButton
