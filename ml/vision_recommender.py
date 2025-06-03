import os
import numpy as np
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
import tensorflow as tf


def load_and_preprocess(img_path):
    img = tf.keras.preprocessing.image.load_img(img_path, target_size=(224, 224))
    x = tf.keras.preprocessing.image.img_to_array(img)
    x = tf.keras.applications.vgg16.preprocess_input(x)
    return x[None, ...]


class VisionRecommender:
    """Simple vision-based recommender using VGG16 + PCA + KMeans."""

    def __init__(self, pca_components=50, n_clusters=8):
        base = tf.keras.applications.VGG16(weights="imagenet", include_top=False, pooling="avg")
        self.extractor = tf.keras.Model(inputs=base.input, outputs=base.output)
        self.pca = PCA(n_components=pca_components)
        self.cluster = KMeans(n_clusters=n_clusters, random_state=0)

    def extract_features(self, img_path):
        x = load_and_preprocess(img_path)
        feats = self.extractor(x)
        return feats.numpy().flatten()

    def fit(self, image_dir):
        feats, paths = [], []
        for fn in os.listdir(image_dir):
            fp = os.path.join(image_dir, fn)
            if not os.path.isfile(fp) or not fn.lower().endswith((".jpg", ".jpeg", ".png")):
                continue
            feats.append(self.extract_features(fp))
            paths.append(fp)
        X = np.vstack(feats)
        Xr = self.pca.fit_transform(X)
        self.cluster.fit(Xr)
        self.embeddings = Xr
        self.paths = np.array(paths)

    def recommend(self, query_img, top_k=5):
        qf = self.extract_features(query_img).reshape(1, -1)
        qr = self.pca.transform(qf)
        label = self.cluster.predict(qr)[0]
        mask = self.cluster.labels_ == label
        dists = np.linalg.norm(self.embeddings[mask] - qr, axis=1)
        idxs = np.argsort(dists)[:top_k]
        return list(self.paths[mask][idxs])


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Vision based outfit recommender")
    parser.add_argument("--data", required=True, help="Folder of images for fitting")
    parser.add_argument("--query", required=True, help="Query image path")
    parser.add_argument("--topk", type=int, default=5, help="Number of results")
    args = parser.parse_args()

    vr = VisionRecommender()
    vr.fit(args.data)
    recs = vr.recommend(args.query, top_k=args.topk)
    print("Top recommendations:")
    for r in recs:
        print(" ", r)
