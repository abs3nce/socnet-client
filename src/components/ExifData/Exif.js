import React, { Component } from "react";

//images
import cameraIcon from "../../images/camera2.svg";
import lensIcon from "../../images/lens3.svg";
import settingsIcon from "../../images/settings.svg";

class Exif extends Component {
    render() {
        const { exifData } = this.props;
        return (
            <div className="row justify-content-left align-items-center exif">
                {exifData.image.Model && (
                    <div className="exif-camera">
                        <span>
                            <img
                                src={cameraIcon}
                                alt=""
                                style={{
                                    height: "40px",
                                    width: "auto",
                                }}
                            />
                        </span>
                        <span>{exifData.image.Model}</span>
                    </div>
                )}
                {exifData.exif.LensModel && (
                    <div className="exif-lens">
                        <span>
                            <img
                                src={lensIcon}
                                alt=""
                                style={{
                                    height: "40px",
                                    width: "auto",
                                }}
                            />
                        </span>
                        <span>{exifData.exif.LensModel}</span>
                    </div>
                )}
                {exifData.exif.FocalLength &&
                    exifData.exif.FNumber &&
                    exifData.exif.ExposureTime &&
                    exifData.exif.ISO &&
                    exifData.exif.ExposureCompensation !== undefined && (
                        <div className="exif-settings">
                            <span>
                                <img
                                    src={settingsIcon}
                                    alt=""
                                    style={{
                                        height: "40px",
                                        width: "auto",
                                    }}
                                />
                            </span>
                            <span>{exifData.exif.FocalLength}mm</span>
                            <span>
                                f/
                                {exifData.exif.FNumber}
                            </span>
                            <span>
                                1/
                                {1 / exifData.exif.ExposureTime}s
                            </span>
                            <span>ISO {exifData.exif.ISO}</span>
                            <span>
                                EVC{" "}
                                {exifData.exif.ExposureCompensation.toString().slice(
                                    0,
                                    4
                                )}
                            </span>
                        </div>
                    )}
            </div>
        );
    }
}
export default Exif;
