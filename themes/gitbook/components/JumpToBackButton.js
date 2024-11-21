/**
 * Jump to top of page
 * This control will appear when the screen slides down 500 pixels
 * @param targetRef Target html tag with associated height
 * @param showPercent Whether to display percentage
 * @returns {JSX.Element}
 * @constructor
 */
const JumpToBackButton = ({ showPercent = false, percent, className }) => {
  return (
    <div
      id="jump-to-back"
      data-aos="fade-up"
      data-aos-duration="300"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
      className="fixed xl:right-80 right-2 mr-20 bottom-40 z-20 "
    >
      <i
        className="fa-solid fa-chevron-left hover:scale-110 duration-150 cursor-pointer p-2 rounded-full border text-white text-xs  bg-stone-500  "
        onClick={() => {
          window.history.back()
        }}
      >
        &nbsp; 뒤로 &nbsp;
      </i>
    </div>
  )
}

export default JumpToBackButton
