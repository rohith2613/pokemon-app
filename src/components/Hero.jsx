
import Image from '../assets/image.png'


const Hero = () => {
  return (
    <>
    
    <div className="navbar bg-base-100">
  <div className="flex-1">
  <a href="/" className='btn btn-ghost text-xl'>Pokémon</a>
  </div>
  <div className="flex-none">
    <button className="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
    </button>
  </div>
</div>
    <div className="hero  bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <img src={Image} className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl sm:text-3xl font-bold">Exquisite Pokémon Collection</h1>
      <p className="py-6">Explore the world, capture, train, and engage in battles with virtual Pokemon. Become a Pokemon Master</p>
      <button className="btn btn-primary">Try Now</button>
    </div>
  </div>
</div>
</>
  )
}

export default Hero
