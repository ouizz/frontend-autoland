import MainLayout from '../../src/components/layouts/MainLayout'
import fetchPortfolio from '../../services/portfolio_api'


const ProductDetail = ({productdetail}) => {

    console.log(productdetail)

    return (
        <MainLayout 
            pageTitle= {`${productdetail.Title} การวางแผนโครงการสำหรับองค์กร | Portfolio | SamitKoyom.com`}
            description="ผลงานของฉัน สามิตร โกยม หน้ารวบรวมผลงาน"
            KeyWords="ผลงาน, สามิตร โกยม,หน้ารวบรวมผลงาน,อาจารย์สอนเขียนเว็บ, สอน PHP and MySQL,ปรึกษาโปรเจ็กต์ทำเว็บ,รับทำเว็บ,รับออกแบบเว็บไซต์, แอพพลิเคชั่น android, แอพพลิเคชั่น ios"
            image="https://www.itgenius.co.th/assets/frondend/images/socialcover/home-social-share.jpg"
        >

            <section>
                    
                <div className="container py-20 mx-auto">
                    <div className="flex flex-wrap"> {/* items-center */}
                    <div className="w-full p-4 lg:w-4/12">
                        <img src={`https://auto-land.herokuapp.com${productdetail.Thumbnail.data.attributes.url}`} className="w-full" />
                        
                        <div id="controls-carousel" className="relative" data-carousel="static">
                            {/* Carousel wrapper */}
                            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                                {
                                    productdetail.Gallery.data.map((gval , index) => {
                                        return (
                                            
                                            <div className="hidden duration-700 ease-in-out" data-carousel-item key={index}>
                                                <img src={`https://auto-land.herokuapp.com${gval.attributes.url}`} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                <span className="hidden">Previous</span>
                                </span>
                            </button>
                            <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                <span className="hidden">Next</span>
                                </span>
                            </button>
                        </div>

                    </div>
                    <div className="w-full p-4 lg:w-7/12 lg:ml-auto">
                        <h6 className="mb-3 font-medium text-indigo-900">{productdetail.Title}</h6>
                        <h3 className="price">{ productdetail.Price }</h3>
                        <h2 className="mb-3 text-4xl font-semibold leading-tight text-gray-800 capitalize">{productdetail.Title}</h2>
                        {productdetail.Detail}
                    </div>
                    </div>
                </div>
            </section>

        </MainLayout>
    )
}

export async function getStaticPaths() {
    const productsItems = await fetchPortfolio('api/product-cars' , { populate: "*" } )
    const paths = await productsItems.data.map((val , index) => ({
        params: { slug: val.attributes.Slug }
    }))

    return { paths, fallback: false }

    /*
    return {
        paths: products.data.map((val , index) => ({
            params: {
                slug: val.attributes.Slug,
                id : 1
            }
        })),
        fallback: false 
    }
    */
}

export async function getStaticProps({params}) {
    /*const productdetail = await fetchPortfolio(`api/product-cars/${params.id}` , { populate: "*" } )
    return {
        props: { productdetail: productdetail[0] },
        revalidate: 1
    }*/
    const productdetail = await fetchPortfolio(`api/product-cars/?filters[Slug]=${params.slug}&populate=*` )
    return {
        props: { productdetail: productdetail.data[0].attributes },
        revalidate: 1
    }

}

export default ProductDetail
