import Link from 'next/link';
import MainLayout from '../src/components/layouts/MainLayout';
import PortfolioApi from '../services/portfolio_api'

export default function Home({productsItems}) {

  console.log(productsItems);
  
  return (
    
    <MainLayout 
      pageTitle="Autoland | หน้าหลัก | autoland.com" 
      description="ผลงานของฉัน สามิตร โกยม หน้ารวบรวมผลงาน"
      KeyWords="ผลงาน, สามิตร โกยม,หน้ารวบรวมผลงาน,อาจารย์สอนเขียนเว็บ, สอน PHP and MySQL,ปรึกษาโปรเจ็กต์ทำเว็บ,รับทำเว็บ,รับออกแบบเว็บไซต์, แอพพลิเคชั่น android, แอพพลิเคชั่น ios"
      image="https://www.itgenius.co.th/assets/frondend/images/socialcover/home-social-share.jpg"
    >
      
      <section>
        <div className="container py-20 mx-auto text-center">
          
          <div className="w-full px-4 mb-4 lg:mx-auto lg:w-1/2">
            <h2 className="mb-2 text-4xl font-semibold leading-tight text-gray-800 capitalize">รวมผลงานล่าสุดของฉัน</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae congue tortor. </p>
          </div>

          <div className="flex flex-wrap items-center mb-4">
            
            {productsItems.data.map((val , index) => {
              return (
                <div className="w-full p-4 lg:w-3/12 sm:w-6/12" key={ index } data={ index }>
                  <Link href="/productdetail/[slug]" as={`/productdetail/${val.attributes.Slug}`}>
                    <a className="block text-left hover:opacity-75"> 
                      <img src={`https://auto-land.herokuapp.com${val.attributes.Thumbnail.data.attributes.url}`} className="object-cover w-full h-64" /> 
                      <div className="flex items-center justify-between px-4 py-3 bg-indigo-100">
                        <h5 className="text-base font-semibold text-gray-900">{ val.attributes.Title }</h5>
                        <i className="fa-plus fas" />
                      </div> 
                    </a>
                  </Link>
                </div>
              )
            })}

          
            {/* 
            <div className="w-full p-4 lg:w-3/12 sm:w-6/12">
              <Link href="/portfolio-detail">
                <a className="block text-left hover:opacity-75"> 
                  <img src="images/img-work-1.jpg" className="object-cover w-full h-64" /> 
                  <div className="flex items-center justify-between px-4 py-3 bg-indigo-100">
                    <h5 className="text-base font-semibold text-gray-900">Project 1</h5>
                    <i className="fa-plus fas" />
                  </div> 
                </a>
              </Link>
            </div>
            
            <div className="w-full p-4 lg:w-3/12 sm:w-6/12">
              <Link href="/portfolio-detail">
                <a className="block text-left hover:opacity-75"> 
                  <img src="images/img-work-2.jpg" className="object-cover w-full h-64" /> 
                  <div className="flex items-center justify-between px-4 py-3 bg-indigo-100">
                    <h5 className="text-base font-semibold text-gray-900">Project 2</h5>
                    <i className="fa-plus fas" />
                  </div> 
                </a>
              </Link>
            </div>
            
            <div className="w-full p-4 lg:w-3/12 sm:w-6/12">
              <Link href="/portfolio-detail">
                <a className="block text-left hover:opacity-75"> 
                  <img src="images/img-work-3.jpg" className="object-cover w-full h-64" /> 
                  <div className="flex items-center justify-between px-4 py-3 bg-indigo-100">
                    <h5 className="text-base font-semibold text-gray-900">Project 3</h5>
                    <i className="fa-plus fas" />
                  </div> 
                </a>
              </Link>
            </div>
            
            <div className="w-full p-4 lg:w-3/12 sm:w-6/12">
              <Link href="/portfolio-detail">
                <a className="block text-left hover:opacity-75"> 
                  <img src="images/img-work-4.jpg" className="object-cover w-full h-64" /> 
                  <div className="flex items-center justify-between px-4 py-3 bg-indigo-100">
                    <h5 className="text-base font-semibold text-gray-900">Project 4</h5>
                    <i className="fa-plus fas" />
                  </div> 
                </a>
              </Link>
            </div>
            */}

          </div>

         </div> 
      </section>
    </MainLayout>
  )
}


// เรียกใช้ Function getStaticProps มันยิงเข้าที่ component นี้ทันที
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  
  //const portfolioItems = await PortfolioApi('portfolios')
  const productsItems = await PortfolioApi('api/product-cars' , { populate: "*" } )

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      productsItems,
    },
    revalidate: 30 //30 second
  }
  
}

