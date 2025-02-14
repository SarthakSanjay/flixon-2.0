import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
export default function HeroContent() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const items = [
    {
      "name": "Fantastic 4",
      "url": "https://i.ytimg.com/vi/AzMo-FgRp64/maxresdefault.jpg"
    },
    {
      "name": "Thunderbolts*",
      "url": "https://i.ytimg.com/vi/v-94Snw-H4o/maxresdefault.jpg"
    },
    {
      "name": "Captain America Brave New World",
      "url": "https://comicbook.com/wp-content/uploads/sites/4/2025/01/Captain-America-Brave-New-World-cover-image.jpg"
    }
  ]
  return (
    <div className="h-max w-full border border-white">

      <Carousel
        setApi={setApi}
        className="border-green-500 border-0 h-full w-full"
        plugins={[
          Autoplay({
            delay: 10000,
          }),
        ]}>
        <CarouselContent >
          {
            items.map((item, index) => {
              return <CarouselItem key={index} className="border border-yellow-500 h-max w-full flex justify-center items-center">

                <img src={item.url}
                  className="" />

              </CarouselItem>

            })
          }
        </CarouselContent>
        {/* <CarouselPrevious /> */}
        {/* <CarouselNext /> */}
      </Carousel>

    </div>
  )
}
