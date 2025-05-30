export default function DiscountBedge({ discount }) {

    const discountBadgeStyle = {
        position: 'absolute',
        top: '12px',
        right: '12px',
        backgroundColor: '#dc3545',
        color: 'white',
        padding: '0.3em 0.6em',
        borderRadius: '0.375rem',
        fontSize: '0.85em',
        fontWeight: 'bold',
        zIndex: 10
    };

    return (<>
        {discount > 0 && (
            <div style={discountBadgeStyle}>
                -{discount}%
            </div>
        )}
    </>
    )
}