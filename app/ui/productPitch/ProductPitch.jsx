import { inter } from "@/app/lib/fonts"
import styles from "./productPitch.module.css"

export function ProductPitch({className}){
    return (
        <article className={`${inter.className} ${styles.productPitch} ${className}`}>
            <h2 className={`${styles.highlightText} ${styles.header}`}>Step into the world of Canadian Dairy House</h2>
            <p className={`${styles.body}`}>
                Discover a wide array of dairy delights that will tantalize your taste buds and nourish your body.
            </p>
            <img
                src="/assets/imgs/productimg.png"
                alt="Some of Canadian Dairy House's products"
                title="Some of Canadian Dairy House's products"
            />
        </article>
    )
}