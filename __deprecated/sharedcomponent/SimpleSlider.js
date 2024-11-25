import React from 'react'
import Slider from 'react-slick'

function CustomSlide(props) {
  const { index, ...otherProps } = props
  return (
    <div className="mantine-Chip-root" {...otherProps}>
      {/* <input type="checkbox" id="mantine-1" value=""></input> */}
      <div for="mantine-1" className="mantine-Chip-label">
        {index}
      </div>
    </div>
  )
}
function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return <div className={className} style={{ ...style }} onClick={onClick} />
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style
      }}
      onClick={onClick}
    />
  )
}

export default function SimpleSlider() {
  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  }
  return (
    <div className="slider-container px-6   ">
      <Slider {...settings}>
        <CustomSlide index={'길어지면 어쩔건데'} />
        <CustomSlide index={2} />
        <CustomSlide index={3} />
        <CustomSlide index={4} />
        <CustomSlide index={5} />
        <CustomSlide index={6} />
        <CustomSlide index={6} />
        <CustomSlide index={6} />
        <CustomSlide index={6} />
        <CustomSlide index={6} />
      </Slider>
    </div>
  )
}
