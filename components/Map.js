import { useEffect, useRef } from 'react';

const Map = ({ latitude, longitude }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.google) {
        // 地図の初期設定
        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: latitude, lng: longitude },
            zoom: 15,
        });

        // マーカーの設定（お店の位置）
        new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map,
            title: "お店の位置", // マーカーのホバー時に表示されるテキスト
        });
        }
    }, [latitude, longitude]);

    return <div ref={mapRef} style={{ width: '100%', height: '300px' }} />;
};

export default Map;
