import cls from '../styles/events.module.scss'

export const EventsList  = () => {

    

    return (
        <>
            <div className={cls.event}>
                <div className={cls.serch}>
                    <input type="text"
                           className={cls.searcher}
                    />
                </div>
            </div>
        </>
    )
}