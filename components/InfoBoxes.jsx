import InfoBox from "./InfoBox"

const InfoBoxes = () => {
    return (
        <section>
            <div className="container-xl lg:container m-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                    <InfoBox
                        heading={"Pour les locataires"}
                        buttonInfo={{ text: "Parcourir les locations", link: "/properties" }}
                    >
                        Trouver la location de vos rêves. Enregistrez les offres et
                        contactez les propriétaires.
                    </InfoBox>
                    <InfoBox
                        heading={"Pour les propriétaires"}
                        buttonInfo={{ text: "Ajouter la location", link: "/properties/add" }}
                    >Ajouter votre propriété et trouvez facilement des potentiels clients.
                    </InfoBox>
                </div>
            </div>
        </section>
    )
}

export default InfoBoxes