"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'

enum ProductCategory {
  ACCESSORY = 'accessory',
  CLOTHING = 'clothing',
  SHOES = 'shoes',
  BAG = 'bag',
  WATCH = 'watch',
  JEWELRY = 'jewelry',
  BEAUTY = 'beauty',
  HOME = 'home',
  BABY = 'baby',
  PET = 'pet',
  SPORT = 'sport',
  TECH = 'tech',
}

enum AccessoryKind {
  NECKLACE = 'necklace',
  RING = 'ring',
  BRACELET = 'bracelet',
}

enum JewelType {
  DIAMOND = 'diamond',
  RUBY = 'ruby',
  EMERALD = 'emerald',
}
enum MaterialType {
  GOLD = 'gold',
  SILVER = 'silver',
  PLATINUM = 'platinum',
}


interface BaseProduct {
  id: number
  name: string
  price: number
  description: string
  image: string
  category: ProductCategory
}

interface AccessoryProduct extends BaseProduct {
  category: ProductCategory.ACCESSORY
  kind: AccessoryKind
  jewelType: JewelType
  material: MaterialType
}
interface ClothingProduct extends BaseProduct {
  category: ProductCategory.CLOTHING
  size: string
  color: string
}

type Product = AccessoryProduct | ClothingProduct

export default function Home() {
  // 기본값을 원시 타입으로 넣으면 타입 추론이 가능하다.
  const [count, setCount] = useState(0)
  const [text, setText] = useState('hello')
  // 타입 추론이 불가능한 경우에는 제네릭으로 타입을 명시해줘야 한다.
  // 제네릭 - 복제약
  // 외부에서 받은 타입으로 함수, 타입을 정의할 수 있게 해준다.
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      // fetch json data from nextjs assets
      const res = await fetch('/products.json')
      const data = await res.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  const productList = products.map((product) => {
    if (product.category === ProductCategory.ACCESSORY) {
      return (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
          />
          Details:
          <p>{product.jewelType}</p>
          <p>{product.material}</p>
          kind:
          <p>{product.kind}</p>

        </div>
      )
    } 
    if (product.category === ProductCategory.CLOTHING) {
      return (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
          />
          Details:
          <p>{product.size}</p>
          <p>{product.color}</p>
        </div>
      )
    }
    return null
  })

  console.log(products)  

  return (<>
    <h1>Veste de qualité</h1>
    <p>Produits de qualité</p>
    <div>
      {productList}
    </div>
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <p>{count}</p>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
    <div>
      <button onClick={() => setText('hello')}>hello</button>
      <button onClick={() => setText('world')}>world</button>
      <p>{text}</p>
    </div>
  </>)
}
