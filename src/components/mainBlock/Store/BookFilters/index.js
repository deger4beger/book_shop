import React, { useEffect, useState } from 'react';
import cn from "classnames"

import s from './styles.module.css'
import searchIconDark from "assets/searchIconDark.png"
import searchIconLight from "assets/searchIconLight.png"
import cross from "assets/cross.png"



const BookFilters = React.memo(({getBooks, theme, filter, totalCount}) => {

    const [search, setSearch] = useState(filter.search)
    const [category, setCategory] = useState(filter.category)
    const [price, setPrice] = useState(filter.price_min + " " + filter.price_max)
    const [ordering, setOrdering] = useState(filter.ordering)
    const [sale, setSale] = useState(filter.sale_min)

    useEffect( () => {
        setSearch(filter.search)
        setCategory(filter.category)
        setPrice(filter.price_min + " " + filter.price_max)
        setOrdering(filter.ordering)
        setSale(filter.sale_min)
    }, [filter])

    const onSubmitFilters = (e, clear=false) => {
        if (clear) {
            getBooks({
                category: "",
                ordering: "",
                search: "",
                price_min: "",
                price_max: "",
                sale_min: ""
            })
        } else {
            const newPrice = price.split(" ")
            const filter = {
                category,
                ordering,
                search,
                price_min: newPrice[0] ? newPrice[0] : "",
                price_max: newPrice[1] ? newPrice[1] : "",
                sale_min: sale
            }
            getBooks(filter)
        }
    }


    const onEnterClick = (e) => {
        if (e.key === "Enter") {
            onSubmitFilters()
        }
    }

    return (
        <div>
            <div className={s.container}>
                {!!totalCount && <div className={s.found}>Books found: {totalCount}</div>}
                <div className={s.inner}>
                    <div className={s.inputBlock}>
                        <input type="text" name="search"
                            onChange={e => setSearch(e.currentTarget.value)}
                            value={search}
                            onKeyDown={onEnterClick} className={cn(s.search, s.commonFields)}
                            placeholder="Type author or book title"/>
                        <div className={s.searchIconBlock}
                            onClick={onSubmitFilters}>
                            <img src={theme === "dark" ? searchIconDark : searchIconLight}
                                alt="#" className={s.searchIcon} />
                        </div>
                    </div>
                    <div className={s.others}>
                        <div className={s.selects}>
                            <select name="sale"
                                    onChange={e => setSale(e.currentTarget.value)}
                                    value={sale}
                                    className={cn(s.select, s.commonFields, s.left)}>
                                <option value="">Sale & no sale</option>
                                <option value="1.00">Only sale</option>
                            </select>
                            <select name="category"
                                    onChange={e => setCategory(e.currentTarget.value)}
                                    value={category}
                                    className={cn(s.select, s.commonFields)}>
                                <option value="">Category</option>
                                <option value="science">Science</option>
                                <option value="fiction">Fiction</option>
                                <option value="educational">Educational</option>
                            </select>
                            <select name="price"
                                    onChange={e => setPrice(e.currentTarget.value)}
                                    value={price}
                                    className={cn(s.select, s.commonFields)}>
                                <option value="">Price</option>
                                <option value="0 5">&lt;5 $</option>
                                <option value="5 10">5-10 $</option>
                                <option value="10 15">10-15 $</option>
                                <option value="15 20">15-20 $</option>
                                <option value="20 5000">&gt;20 $</option>
                            </select>
                            <select name="ordering"
                                    onChange={e => setOrdering(e.currentTarget.value)}
                                    value={ordering}
                                    className={cn(s.select, s.commonFields, s.right)}>
                                <option value="">Sorting</option>
                                <option value="price">In ascending order</option>
                                <option value="-price">In descending order</option>
                            </select>
                            <div className={s.cross} onClick={(e) => onSubmitFilters(e, true)}>
                                <img
                                    src={cross}
                                    alt=""
                                    className={s.crossIcon}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
      )
})

export default BookFilters;
