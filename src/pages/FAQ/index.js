import bg from '~/assets/images/bg.png';

function FAQ() {
    return (
        <>
            <div style={{ position: 'fixed', width: '100%', height: '100%' }}>
                <img src={bg} className="img-fluid" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="ico"></img>
            </div>
        </>
    );
}
export default FAQ;
