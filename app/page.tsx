// External
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

// Components
import { MainBtn } from "@/components/Buttons/MainBtn";
import { FaqAccordion } from "@/components/FaqAccordion";
import { OFERTAIMAGES } from "@/constants/Links";
import { TEXT_SECTIONS } from "@/constants/homepage";
import LinkShare from "@/components/ui/LinkShare";
import FadeInOnScroll from "@/components/FadeInOnScroll";

// Dynamic Components
const Carousel = dynamic(() => import("@/components/Carousel"), { ssr: true });
const SesjaComponent = dynamic(() => import("@/components/SesjaComponent"));
const CTASendMail = dynamic(() => import("@/components/CTASendMail"));
const InviteSocialMedia = dynamic(
    () => import("@/components/InviteSocialMedia")
);
const InstagramGrid = dynamic(
    () => import("@/components/instagram/InstagramGrid")
);
const Opinions = dynamic(() => import("@/components/Opinions"));
const StepsWithLazyBackground = dynamic(
    () => import("@/components/StepsWithLazyBackground")
);

const pageTitle = "Fotograf Siedlce: Fotografia Ślubna i Artystyczna, Foto";
const pageDescription =
    "Fotograf Siedlce: Jarek Olszewski fotografia ślubna i reportaże. Najlepszy fotograf ślubny w Siedlcach. Zobacz portfolio i zamów sesję!";

export const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
        title: pageTitle,
        description: pageDescription,
        images: [
            {
                url: "/Images/fotograf-siedlce-jarek-olszewski.jpg",
                width: 400,
                height: 260,
                alt: "Fotografia ślubna - Jarek Olszewski",
            },
        ],
    },
};

export default function Home() {
    return (
        <div className="anim-opacity">
            <Carousel />
            <div className="p-2 py-12 text-center relative  max-w-screen-xl mx-auto">
                <span className="text-2xl ">Cześć! Miło mi że tu jesteś</span>

                <FadeInOnScroll delay={0.1}>
                    <div className="relative text-start mt-12 flex flex-col lg:flex-row items-center justify-center">
                        <Image
                            src="/Images/fotograf-siedlce-jarek-olszewski.jpg"
                            alt="fotograf siedlce jarek-olszewski"
                            width={300}
                            height={250}
                            priority
                        />
                        <div className="w-[270px] lg:w-[400px] bg-black/60 lg:-ml-20 lg:mt-0 -mt-12 px-8 py-6 text-white text-xs tracking-tight backdrop-blur-sm">
                            <h1 className="text-xl font-semibold mb-2">
                                Fotograf Ślubny Siedlce - Jarek Olszewski |
                                Fotografia Ślubna
                            </h1>
                            <p>
                                Zajmuję się uwiecznianiem wyjątkowych chwil w
                                życiu - od pełnych emocji ślubów, chrztów,
                                komunii i sesji narzeczeńskich, po sesje
                                rodzinne, plenerowe, noworodkowe, kobiece i
                                okolicznościowe. Każda z nich to dla mnie osobna
                                opowieść, którą tworzę z pasją, wrażliwością i
                                dbałością o każdy detal - tak, by zatrzymać
                                emocje na dłużej.
                            </p>
                        </div>
                    </div>
                </FadeInOnScroll>

                <div className="my-10">
                    <FadeInOnScroll delay={0.1}>
                        <h2 className="text-xl py-4">
                            Szukasz fotografa ślubnego? Reportaż ślubny
                        </h2>
                    </FadeInOnScroll>
                    <FadeInOnScroll delay={0.3}>
                        <p className="px-3 max-w-3xl mx-auto">
                            Szukasz kogoś, kto w sposób dyskretny i
                            profesjonalny uwieczni dzień Waszego ślubu? Oferuję
                            pakiety fotograficzne dopasowane do Waszych potrzeb.
                            Moja fotografia to coś więcej niż tylko zdjęcia. To
                            historia Waszej miłości, którą chcę opowiedzieć
                            kadrami. Każdy reportaż tworzę indywidualnie, z
                            dbałością o każdy szczegół - od przygotowań, przez
                            ceremonię do oczepin. Klienci cenią mnie za
                            profesjonalizm, podejście do pracy i naturalny styl.
                        </p>
                    </FadeInOnScroll>
                </div>

                <section className="relative w-full h-full grid grid-cols-1 lg:grid-cols-4 my-8">
                    <div className="relative w-[80%] max-w-[600px] lg:mr-24 md:w-1/2 md:h-80 lg:h-96 lg:col-span-4 md:ml-auto ml-12 h-48 mb-24 px-3 -space-x-10 lg:space-x-0 mt-12">
                        <Image
                            src="/Images/slub.jpg"
                            alt="Fotografia ślubna Para Młoda podczas ceremonii"
                            sizes="(max-width: 768px) 300px, (max-width: 1200px) 450px, 600px"
                            fill
                            className="object-cover"
                            quality={75}
                        />

                        <div className="absolute -bottom-12 md:bottom-1/2 md:translate-y-1/2 md:-left-1/3 md:-translate-x-1/2 left-0 bg-black/60 text-start px-8 py-6 backdrop-blur-sm lg:p-12 z-10 h-max w-full">
                            <p className="capitalize text-white text-2xl lg:text-5xl mb-2">
                                reportaż ślubny
                            </p>
                            <Link
                                href="/fotografia-slubna"
                                aria-label="fotografia slubna"
                                className="text-white text-sm py-1 px-4 border border-white"
                            >
                                Zobacz
                            </Link>
                        </div>
                    </div>
                    {OFERTAIMAGES.map((img, index) => (
                        <SesjaComponent
                            key={index}
                            img={img.src}
                            title={img.title}
                            href={img.href}
                        />
                    ))}

                    <Link
                        href="/oferta"
                        aria-label="oferta"
                        className="w-max mx-auto h-max hover:bg-black hover:text-white transition-color-colors -right-[14%] top-12 px-12 py-8 border-black border-2 font-semibold "
                    >
                        <p className="uppercase text-center">
                            {["i", "wiele", "więcej"].map((word, index) => (
                                <span key={index} className="block">
                                    {word}
                                </span>
                            ))}
                        </p>
                    </Link>
                </section>
            </div>

            <div className="space-y-4 p-24 bg-neutral-900 text-white flex items-center justify-center flex-col">
                <FadeInOnScroll delay={0.1}>
                    <h3 className="text-2xl text-center">
                        Porozmawiajmy o Twoim pomyśle na zdjęcia{" "}
                    </h3>
                </FadeInOnScroll>

                <CTASendMail title="Napisz Do Mnie" />
            </div>

            <section className="bg-white py-20 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h4 className="text-3xl font-semibold text-neutral-900 mb-12 tracking-tight">
                        Opinie klientów
                    </h4>
                    <Opinions />
                    <div className="flex items-center justify-center">
                        <p className="mr-2">Opinie z </p>
                        <LinkShare
                            title="Google"
                            target="_blank"
                            href="https://www.google.com/search?sca_esv=36354fdb691823cb&rlz=1C5CHFA_enPL994PL994&sxsrf=AHTn8zocdBNdDop6JxFkDh7ZvwmBGz-yQA:1747759200679&q=jarekolszewski&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzSHL3h72FHJno5lAMGESINrEPckvvMSP28qIzP1NmX36Zu8MiyMs01d8X2DaqEuEVDJ_aYs%3D&uds=ABqPDvzh2Ji1Kqt-7EMvWRUQDfyq32fE0uGbr4uJQc4sQZqDb8FkSTC7VC6zBtw9Ms1apU7KPJzGzztDOCAB1tHAo1cvIm1_8fG54_w7B1HbpkvD_2-_u34&sa=X&ved=2ahUKEwjoxryyvrKNAxWlR_EDHTPOImYQ3PALegQIHhAE&biw=1680&bih=963&dpr=2"
                        />
                    </div>

                    <div className="mt-12">
                        <Link
                            href="/portfolio"
                            aria-label="Przejdz do galerii z fotografią"
                        >
                            <MainBtn>Moje portfolio</MainBtn>
                        </Link>
                    </div>
                </div>
            </section>

            <StepsWithLazyBackground />

            <FaqAccordion />
            <InstagramGrid />

            <div className="bg-gradient-to-tr bg-gray-100 py-16 mt-16 px-6 md:px-12">
                <section className="max-w-6xl mx-auto space-y-16 md:space-y-24">
                    {TEXT_SECTIONS.map(({ title, keyword, content }, index) => {
                        const isReversed = index % 2 === 1;

                        return (
                            <div
                                key={index}
                                className={`
                        md:flex md:items-center md:justify-between md:gap-12 pb-8
                        ${isReversed ? "md:flex-row-reverse md:text-end" : ""}
                    `}
                                style={{ scrollMarginTop: "5rem" }}
                            >
                                <div
                                    className={`
                            md:w-1/3 mb-8 md:mb-0 px-4 
                            border-brand-nav 
                            ${
                                isReversed
                                    ? "border-l-4 md:border-l-0 md:border-r-4 "
                                    : "border-l-4 "
                            }
                        `}
                                >
                                    <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 drop-shadow-sm mb-2">
                                        {title}
                                    </h2>
                                    {keyword && (
                                        <p
                                            className={`bg-brand-nav text-white text-xs w-max font-semibold px-3 py-1 rounded-full capitalize ${
                                                isReversed
                                                    ? "md:ml-auto"
                                                    : ""
                                            }`}
                                        >
                                            {keyword}
                                        </p>
                                    )}
                                </div>
                                <div className="md:w-2/3 px-4">
                                    <p className="text-gray-700 leading-relaxed text-start text-lg md:text-xl">
                                        {content}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </section>
            </div>

            <div className="pb-20 bg-neutral-900">
                <InviteSocialMedia
                    text="Więcej znajdziesz na"
                    textColor="text-white"
                />
            </div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2450.5668306245725!2d22.124585399999997!3d52.105814599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471f4f75292183f3%3A0x4d6060c876f5795!2sJarek%20Olszewski%20-%20Fotograf!5e0!3m2!1spl!2spl!4v1747762167147!5m2!1spl!2spl"
                title="Lokalizacja studia fotograficznego Jarek Olszewski na mapie Google"
                loading="lazy"
                className="w-full h-96"
            ></iframe>
        </div>
    );
}
